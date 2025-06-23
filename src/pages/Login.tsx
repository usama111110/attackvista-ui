
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertTriangle, ArrowRight, Eye, EyeOff, Sparkles, Shield, Zap, Star } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, currentUser } = useUserStore();
  const { isDarkMode } = useTheme();
  
  // Animation mounting
  useEffect(() => {
    setMounted(true);
  }, []);
  
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

  if (!mounted) return null;

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Animated floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid pattern with animation */}
        <div className="absolute inset-0 opacity-[0.03] animate-pulse-subtle">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Main content with entrance animation */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-slide-up">
          {/* Header with enhanced animations */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6 animate-scale-in">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl transform hover:scale-110 transition-transform duration-300">
                  <Logo size="lg" showText={false} />
                </div>
                {/* Floating icons around logo */}
                <Shield className="absolute -top-2 -right-2 w-6 h-6 text-blue-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <Zap className="absolute -bottom-2 -left-2 w-5 h-5 text-purple-500 animate-bounce" style={{ animationDelay: '1s' }} />
                <Star className="absolute top-0 left-8 w-4 h-4 text-yellow-500 animate-ping" style={{ animationDelay: '1.5s' }} />
              </div>
            </div>
            <h1 className={`text-3xl font-bold mb-2 animate-slide-in-right ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ animationDelay: '0.2s' }}>
              Welcome back
            </h1>
            <p className={`text-lg animate-slide-in-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ animationDelay: '0.4s' }}>
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Login card with enhanced animations */}
          <div className={`relative p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 animate-scale-in group ${
            isDarkMode 
              ? 'bg-gray-900/40 border-gray-700/50 shadow-2xl hover:shadow-3xl' 
              : 'bg-white/60 border-white/50 shadow-xl hover:shadow-2xl'
          }`} style={{ animationDelay: '0.6s' }}>
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-gradient-x"></div>
            
            {/* Floating particles inside card */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            {error && (
              <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 animate-slide-down ${
                isDarkMode 
                  ? 'bg-red-900/30 border border-red-700/40 text-red-300' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                <AlertTriangle size={20} className="flex-shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <p className="font-medium">Authentication failed</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email field with animations */}
              <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.8s' }}>
                <label htmlFor="email" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Email address
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-200 ${
                    focusedField === 'email' 
                      ? 'text-blue-500 scale-110' 
                      : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <Mail className="h-5 w-5 transition-transform duration-200" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-600/30 text-white placeholder-gray-400 focus:bg-gray-800/70' 
                        : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white/80'
                    } border rounded-xl py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              {/* Password field with animations */}
              <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '1s' }}>
                <label htmlFor="password" className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-200 ${
                    focusedField === 'password' 
                      ? 'text-blue-500 scale-110' 
                      : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <Lock className="h-5 w-5 transition-transform duration-200" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-600/30 text-white placeholder-gray-400 focus:bg-gray-800/70' 
                        : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white/80'
                    } border rounded-xl py-3 pl-12 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 hover:scale-110 transition-transform duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className={`h-5 w-5 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} transition-colors`} />
                    ) : (
                      <Eye className={`h-5 w-5 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} transition-colors`} />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Submit button with enhanced animations */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] mt-8 animate-slide-up group"
                style={{ animationDelay: '1.2s' }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Demo credentials with animations */}
          <div className={`mt-8 p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 animate-slide-up ${
            isDarkMode 
              ? 'bg-gray-800/30 border border-gray-700/40' 
              : 'bg-white/40 border border-gray-200/50'
          }`} style={{ animationDelay: '1.4s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Try demo accounts
              </p>
            </div>
            <div className="grid gap-2 text-sm">
              <div className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50/60 hover:bg-gray-50/80'}`}>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Admin</span>
                <code className={`text-xs px-2 py-1 rounded transition-colors ${isDarkMode ? 'bg-gray-600/50 text-gray-300' : 'bg-white/70 text-gray-600'}`}>
                  admin@example.com / admin123
                </code>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50/60 hover:bg-gray-50/80'}`}>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Analyst</span>
                <code className={`text-xs px-2 py-1 rounded transition-colors ${isDarkMode ? 'bg-gray-600/50 text-gray-300' : 'bg-white/70 text-gray-600'}`}>
                  analyst@example.com / analyst123
                </code>
              </div>
            </div>
          </div>
          
          {/* Footer with animation */}
          <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '1.6s' }}>
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
