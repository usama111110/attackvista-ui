import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertTriangle, ArrowRight, Sparkles, Shield, Zap, Star, Loader2 } from "lucide-react";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { useTheme } from "@/providers/ThemeProvider";
import { PremiumInput } from "@/components/ui/premium-input";
import { PremiumButton } from "@/components/ui/premium-button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
      await new Promise(resolve => setTimeout(resolve, 1200));
      
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Advanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5">
        {/* Enhanced fluid background layers */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-aurora opacity-20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-gradient-cyber opacity-15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-premium opacity-10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Animated mesh pattern */}
        <div className="absolute inset-0 opacity-[0.02] animate-gradient-xy">
          <div className="h-full w-full bg-gradient-rainbow" style={{
            maskImage: `radial-gradient(circle at 50% 50%, transparent 1px, black 1px)`,
            maskSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Premium particle system */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float-slow opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content with premium animations */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Enhanced header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-premium rounded-3xl blur-xl opacity-60 animate-glow group-hover:opacity-90 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-aurora rounded-3xl blur-lg opacity-40 animate-gradient-xy"></div>
                <div className="relative bg-gradient-premium p-4 rounded-3xl transform hover:scale-110 transition-all duration-500 hover:rotate-3 shadow-premium">
                  <Logo size="lg" showText={false} />
                </div>
                
                {/* Enhanced floating icons */}
                <Shield className="absolute -top-3 -right-3 w-7 h-7 text-blue-400 animate-bounce shadow-neon" style={{ animationDelay: '0.5s' }} />
                <Zap className="absolute -bottom-3 -left-3 w-6 h-6 text-yellow-400 animate-wiggle" style={{ animationDelay: '1s' }} />
                <Star className="absolute top-1 left-10 w-5 h-5 text-purple-400 animate-ping shadow-glow" style={{ animationDelay: '1.5s' }} />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-3 text-gradient-aurora animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              Welcome back
            </h1>
            <p className="text-lg text-muted-foreground animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              Sign in to your premium security dashboard
            </p>
          </div>

          {/* Premium login card */}
          <div className="glass-morphism-strong p-8 rounded-3xl transition-all duration-700 animate-scale-in group hover:shadow-float hover:-translate-y-1" style={{ animationDelay: '0.6s' }}>
            {/* Enhanced border glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-premium opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-sm animate-gradient-x"></div>
            
            {error && (
              <div className="mb-8 p-5 rounded-2xl glass-morphism border border-red-500/30 flex items-start gap-3 animate-slide-down">
                <AlertTriangle size={22} className="flex-shrink-0 mt-0.5 text-red-400 animate-wiggle" />
                <div>
                  <p className="font-semibold text-red-400 mb-1">Authentication Failed</p>
                  <p className="text-sm text-red-300/80">{error}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="animate-slide-in-right" style={{ animationDelay: '0.8s' }}>
                <PremiumInput
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  icon={<Mail className="h-5 w-5" />}
                  variant="glass"
                  size="lg"
                  required
                />
              </div>
              
              <div className="animate-slide-in-right" style={{ animationDelay: '1s' }}>
                <PremiumInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  icon={<Lock className="h-5 w-5" />}
                  variant="glass"
                  size="lg"
                  required
                />
              </div>
              
              <div className="animate-slide-up" style={{ animationDelay: '1.2s' }}>
                <PremiumButton
                  type="submit"
                  variant="premium"
                  size="lg"
                  loading={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to Dashboard
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </PremiumButton>
              </div>
            </form>
          </div>
          
          {/* Enhanced demo credentials */}
          <div className="mt-10 glass-morphism p-6 rounded-2xl transition-all duration-700 animate-slide-up hover:shadow-glass hover:-translate-y-0.5" style={{ animationDelay: '1.4s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-gradient-aurora animate-pulse" />
              <p className="font-semibold text-foreground">
                Try Premium Demo Accounts
              </p>
            </div>
            <div className="grid gap-3">
              <div className="glass-morphism p-4 rounded-xl transition-all duration-300 hover:shadow-elegant hover:scale-[1.02] cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">Admin Access</span>
                  <code className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-mono">
                    admin@example.com / admin123
                  </code>
                </div>
              </div>
              <div className="glass-morphism p-4 rounded-xl transition-all duration-300 hover:shadow-elegant hover:scale-[1.02] cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">Analyst View</span>
                  <code className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-mono">
                    analyst@example.com / analyst123
                  </code>
                </div>
              </div>
            </div>
          </div>
          
          {/* Premium pricing button */}
          <div className="text-center mt-10 animate-fade-in" style={{ animationDelay: '1.6s' }}>
            <PremiumButton
              onClick={() => navigate("/pricing")}
              variant="aurora"
              size="lg"
              className="mb-6"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              View Premium Plans
            </PremiumButton>
          </div>
          
          {/* Enhanced footer */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '1.8s' }}>
            <p className="text-sm text-muted-foreground">
              © 2024 SecurityPro. <span className="text-gradient">Enterprise-grade protection.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;