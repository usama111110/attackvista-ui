
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertTriangle, ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
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
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
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
          title: "Welcome back!",
          description: `Logged in as ${user.name}`,
        });
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid email or password");
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again",
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
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Modern animated background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
                  <Logo size="lg" showText={false} />
                </div>
              </div>
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Login card */}
          <div className={`relative p-8 rounded-3xl backdrop-blur-xl border ${
            isDarkMode 
              ? 'bg-gray-900/40 border-gray-700/50 shadow-2xl' 
              : 'bg-white/60 border-white/50 shadow-xl'
          }`}>
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            
            {error && (
              <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 ${
                isDarkMode 
                  ? 'bg-red-900/30 border border-red-700/40 text-red-300' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Authentication failed</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors ${
                      focusedField === 'email' 
                        ? 'text-blue-500' 
                        : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-600/30 text-white placeholder-gray-400' 
                        : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                    } border rounded-xl py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors ${
                      focusedField === 'password' 
                        ? 'text-blue-500' 
                        : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-600/30 text-white placeholder-gray-400' 
                        : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                    } border rounded-xl py-3 pl-12 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    {showPassword ? (
                      <EyeOff className={`h-5 w-5 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} transition-colors`} />
                    ) : (
                      <Eye className={`h-5 w-5 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} transition-colors`} />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-8"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Demo credentials */}
          <div className={`mt-8 p-6 rounded-2xl backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/30 border border-gray-700/40' 
              : 'bg-white/40 border border-gray-200/50'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Try demo accounts
              </p>
            </div>
            <div className="grid gap-2 text-sm">
              <div className={`flex justify-between items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50/60'}`}>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Admin</span>
                <code className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-600/50 text-gray-300' : 'bg-white/70 text-gray-600'}`}>
                  admin@example.com / admin123
                </code>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50/60'}`}>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Analyst</span>
                <code className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-600/50 text-gray-300' : 'bg-white/70 text-gray-600'}`}>
                  analyst@example.com / analyst123
                </code>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8">
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              © 2024 NetworkFort. Secure by design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
