import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertTriangle } from "lucide-react";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, currentUser } = useUserStore();
  
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-gray-400 mt-2">Network Security Dashboard</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-6">Login</h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-700/30 rounded-lg flex items-center gap-2 text-red-400">
              <AlertTriangle size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-400">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-400">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
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
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Default users for testing:</p>
            <div className="mt-2 text-xs text-gray-400 space-y-1">
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
