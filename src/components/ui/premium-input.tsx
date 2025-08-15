import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-xl border-2 bg-background/50 backdrop-blur-sm px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 relative",
  {
    variants: {
      variant: {
        default: "border-input hover:border-primary/50 hover:bg-background/70 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:border-primary focus-visible:bg-background/80 focus-visible:scale-[1.02]",
        glass: "border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/30 focus-visible:bg-white/25 focus-visible:border-white/40 focus-visible:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
        neon: "border-primary/50 bg-transparent hover:border-primary hover:shadow-[0_0_15px_rgba(var(--primary),0.2)] focus-visible:border-primary focus-visible:shadow-[0_0_25px_rgba(var(--primary),0.3)] focus-visible:bg-primary/5",
        floating: "border-input bg-background/80 hover:shadow-lg hover:-translate-y-0.5 focus-visible:shadow-xl focus-visible:-translate-y-1 focus-visible:scale-105",
      },
      size: {
        default: "h-12 text-base",
        sm: "h-10 text-sm px-3 py-2",
        lg: "h-14 text-lg px-5 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PremiumInputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  success?: string;
}

const PremiumInput = React.forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ className, variant, size, label, icon, error, success, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        {label && (
          <label className={cn(
            "text-sm font-medium transition-colors duration-200",
            isFocused ? "text-primary" : "text-foreground/80",
            error ? "text-destructive" : "",
            success ? "text-green-600" : ""
          )}>
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className={cn(
              "absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-all duration-200",
              isFocused ? "text-primary scale-110" : "text-muted-foreground"
            )}>
              {icon}
            </div>
          )}
          <input
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={cn(
              inputVariants({ variant, size }),
              icon && "pl-12",
              isPassword && "pr-12",
              error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
              success && "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/50",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 hover:scale-110 transition-transform duration-200"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              )}
            </button>
          )}
          
          {/* Animated border effect */}
          <div className={cn(
            "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none",
            "bg-gradient-to-r from-primary/20 via-transparent to-primary/20",
            isFocused && "opacity-100"
          )} />
        </div>
        
        {error && (
          <p className="text-sm text-destructive animate-slide-down">
            {error}
          </p>
        )}
        
        {success && (
          <p className="text-sm text-green-600 animate-slide-down">
            {success}
          </p>
        )}
      </div>
    );
  }
);

PremiumInput.displayName = "PremiumInput";

export { PremiumInput, inputVariants };