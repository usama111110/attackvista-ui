
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertTriangle, Shield, Eye, EyeOff, Fingerprint, Cpu, Zap } from "lucide-react";
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
        
        {/* Floating security icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-20 left-20 w-8 h-8 ${isDarkMode ? 'text-primary/10' : 'text-primary/5'} animate-pulse delay-300`}>
            <Shield className="w-full h-full" />
          </div>
          <div className={`absolute top-40 right-32 w-6 h-6 ${isDarkMode ? 'text-blue-500/10' : 'text-blue-500/5'} animate-pulse delay-700`}>
            <Fingerprint className="w-full h-full" />
          </div>
          <div className={`absolute bottom-32 left-32 w-7 h-7 ${isDarkMode ? 'text-green-500/10' : 'text-green-500/5'} animate-pulse delay-1100`}>
            <Cpu className="w-full h-full" />
          </div>
          <div className={`absolute bottom-20 right-20 w-5 h-5 ${isDarkMode ? 'text-purple-500/10' : 'text-purple-500/5'} animate-pulse delay-1400`}>
            <Zap className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Enhanced logo and branding */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
                <Logo size="lg" />
              </div>
            </div>
            <h1 className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
              SecureSentry
            </h1>
            <p className={`text-xl mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
              Enterprise Security Platform
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Shield className={`w-4 h-4 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Military-grade encryption & AI-powered threat detection
              </span>
            </div>
            
            {/* Security features badges */}
            <div className="flex justify-center gap-3 mt-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                isDarkMode 
                  ? 'bg-green-900/30 text-green-400 border border-green-700/30' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                <Fingerprint className="w-3 h-3" />
                2FA Ready
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                isDarkMode 
                  ? 'bg-blue-900/30 text-blue-400 border border-blue-700/30' 
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                <Cpu className="w-3 h-3" />
                AI Protected
              </div>
            </div>
          </div>

          {/* Enhanced login form */}
          <div className={`relative ${
            isDarkMode 
              ? 'bg-gray-900/70 backdrop-blur-2xl border-gray-800/50 shadow-2xl shadow-black/30' 
              : 'bg-white/90 backdrop-blur-2xl border-white/30 shadow-2xl shadow-gray-900/10'
          } rounded-3xl p-8 border-2`}>
            
            {/* Multiple security badges */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <div className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                isDarkMode 
                  ? 'bg-green-900/60 text-green-400 border border-green-700/50 shadow-lg' 
                  : 'bg-green-50 text-green-700 border border-green-200 shadow-md'
              }`}>
                <Shield className="w-3 h-3" />
                SSL Secured
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                isDarkMode 
                  ? 'bg-blue-900/60 text-blue-400 border border-blue-700/50 shadow-lg' 
                  : 'bg-blue-50 text-blue-700 border border-blue-200 shadow-md'
              }`}>
                <Zap className="w-3 h-3" />
                Zero Trust
              </div>
            </div>

            <div className="pt-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Secure Access Portal
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                Enter your credentials to access your security command center
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
                          ? 'bg-gray-800/60 border-gray-700/60 text-white placeholder-gray-500' 
                          : 'bg-gray-50/60 border-gray-300/60 text-gray-900 placeholder-gray-400'
                      } border-2 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200`}
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
                          ? 'bg-gray-800/60 border-gray-700/60 text-white placeholder-gray-500' 
                          : 'bg-gray-50/60 border-gray-300/60 text-gray-900 placeholder-gray-400'
                      } border-2 rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200`}
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
                  className="w-full bg-gradient-to-r from-primary via-primary to-primary/80 text-white py-3.5 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-primary/20"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Access Security Dashboard
                    </>
                  )}
                </button>
              </form>
              
              {/* Enhanced demo credentials section */}
              <div className={`mt-8 p-5 rounded-2xl ${
                isDarkMode 
                  ? 'bg-gray-800/40 border border-gray-700/40' 
                  : 'bg-gray-50/60 border border-gray-200/60'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Fingerprint className={`w-4 h-4 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Demo Security Accounts:
                  </p>
                </div>
                <div className={`space-y-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-black/5 dark:bg-white/5">
                    <span className="font-medium flex items-center gap-2">
                      <Shield className="w-3 h-3" />
                      Administrator:
                    </span>
                    <code className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-700/60' : 'bg-white/60'}`}>
                      admin@example.com / admin123
                    </code>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-black/5 dark:bg-white/5">
                    <span className="font-medium flex items-center gap-2">
                      <Cpu className="w-3 h-3" />
                      Security Analyst:
                    </span>
                    <code className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-700/60' : 'bg-white/60'}`}>
                      analyst@example.com / analyst123
                    </code>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-black/5 dark:bg-white/5">
                    <span className="font-medium flex items-center gap-2">
                      <Zap className="w-3 h-3" />
                      Guest Access:
                    </span>
                    <code className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-700/60' : 'bg-white/60'}`}>
                      guest@example.com / guest123
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced footer */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className={`w-4 h-4 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                SOC 2 Type II Compliant
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Protected by enterprise-grade security protocols & zero-trust architecture
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
