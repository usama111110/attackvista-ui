
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertTriangle, Shield, Eye, EyeOff, ArrowRight } from "lucide-react";
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
        ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50'
    }`}>
      {/* Modern animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full ${
          isDarkMode ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
        } blur-xl animate-pulse`}></div>
        <div className={`absolute bottom-32 right-16 w-40 h-40 rounded-full ${
          isDarkMode ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20' : 'bg-gradient-to-r from-purple-400/20 to-pink-400/20'
        } blur-xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/4 w-24 h-24 ${
          isDarkMode ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20' : 'bg-gradient-to-r from-cyan-400/20 to-blue-400/20'
        } rounded-lg rotate-45 blur-lg animate-pulse delay-500`}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo section with modern styling */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative">
                  <Logo size="lg" />
                </div>
              </div>
            </div>
            <h1 className={`text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } tracking-tight`}>
              Welcome Back
            </h1>
            <p className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } font-light`}>
              Sign in to continue your journey
            </p>
          </div>

          {/* Modern glassmorphism login card */}
          <div className={`relative backdrop-blur-2xl ${
            isDarkMode 
              ? 'bg-white/5 border-white/10 shadow-2xl shadow-black/20' 
              : 'bg-white/70 border-white/20 shadow-2xl shadow-gray-900/10'
          } rounded-3xl p-10 border`}>
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            
            <div className="relative">
              {error && (
                <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4 text-red-400 animate-fade-in backdrop-blur-sm">
                  <AlertTriangle size={24} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg">Authentication Failed</p>
                    <p className="text-sm opacity-90 mt-1">{error}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="email" className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  } block mb-4`}>
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                      <Mail className={`h-6 w-6 transition-all duration-300 ${
                        isDarkMode 
                          ? 'text-gray-400 group-focus-within:text-purple-400' 
                          : 'text-gray-500 group-focus-within:text-purple-600'
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
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-purple-400/50 focus:bg-white/10' 
                          : 'bg-white/50 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/80'
                      } border-2 rounded-2xl py-6 pl-16 pr-6 text-lg font-medium focus:outline-none focus:ring-4 ${
                        isDarkMode ? 'focus:ring-purple-400/20' : 'focus:ring-purple-500/20'
                      } transition-all duration-300 backdrop-blur-sm`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  } block mb-4`}>
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                      <Lock className={`h-6 w-6 transition-all duration-300 ${
                        isDarkMode 
                          ? 'text-gray-400 group-focus-within:text-purple-400' 
                          : 'text-gray-500 group-focus-within:text-purple-600'
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
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-purple-400/50 focus:bg-white/10' 
                          : 'bg-white/50 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/80'
                      } border-2 rounded-2xl py-6 pl-16 pr-16 text-lg font-medium focus:outline-none focus:ring-4 ${
                        isDarkMode ? 'focus:ring-purple-400/20' : 'focus:ring-purple-500/20'
                      } transition-all duration-300 backdrop-blur-sm`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-6 group"
                    >
                      {showPassword ? (
                        <EyeOff className={`h-6 w-6 transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-gray-400 group-hover:text-gray-300' 
                            : 'text-gray-500 group-hover:text-gray-700'
                        }`} />
                      ) : (
                        <Eye className={`h-6 w-6 transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-gray-400 group-hover:text-gray-300' 
                            : 'text-gray-500 group-hover:text-gray-700'
                        }`} />
                      )}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full bg-gradient-to-r from-purple-600 via-purple-600 to-pink-600 text-white py-6 rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-4 shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-[1.02] mt-12 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-4">
                    {isLoading ? (
                      <>
                        <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing you in...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-7 h-7" />
                        <span>Sign In</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </button>
              </form>
              
              {/* Demo credentials with modern design */}
              <div className={`mt-12 p-8 rounded-2xl backdrop-blur-sm ${
                isDarkMode 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white/40 border border-white/30'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <p className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Demo Accounts
                  </p>
                </div>
                <div className={`space-y-4 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-black/10 dark:bg-white/10 backdrop-blur-sm">
                    <span className="font-semibold text-base">Administrator</span>
                    <code className={`px-4 py-2 rounded-lg text-sm font-mono ${
                      isDarkMode ? 'bg-black/20 text-gray-300' : 'bg-white/60 text-gray-700'
                    } backdrop-blur-sm`}>
                      admin@example.com / admin123
                    </code>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-black/10 dark:bg-white/10 backdrop-blur-sm">
                    <span className="font-semibold text-base">Security Analyst</span>
                    <code className={`px-4 py-2 rounded-lg text-sm font-mono ${
                      isDarkMode ? 'bg-black/20 text-gray-300' : 'bg-white/60 text-gray-700'
                    } backdrop-blur-sm`}>
                      analyst@example.com / analyst123
                    </code>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-black/10 dark:bg-white/10 backdrop-blur-sm">
                    <span className="font-semibold text-base">Guest User</span>
                    <code className={`px-4 py-2 rounded-lg text-sm font-mono ${
                      isDarkMode ? 'bg-black/20 text-gray-300' : 'bg-white/60 text-gray-700'
                    } backdrop-blur-sm`}>
                      guest@example.com / guest123
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              © 2024 NetworkFort. Crafted with precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
