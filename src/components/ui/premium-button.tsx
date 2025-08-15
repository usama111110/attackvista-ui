import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const premiumButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        premium: [
          "bg-gradient-premium text-white shadow-premium",
          "hover:shadow-float hover:-translate-y-1 hover:scale-105",
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
          "before:translate-x-[-100%] before:hover:translate-x-[100%]",
          "before:transition-transform before:duration-700",
          "animate-gradient-x"
        ],
        glass: [
          "glass-morphism text-foreground shadow-glass",
          "hover:shadow-float hover:-translate-y-0.5 hover:scale-102",
          "hover:bg-white/20 hover:border-white/30"
        ],
        neon: [
          "bg-transparent border-2 border-primary text-primary shadow-neon",
          "hover:bg-primary hover:text-primary-foreground",
          "hover:shadow-[0_0_40px_rgba(var(--primary),0.6)]",
          "hover:-translate-y-0.5 hover:scale-105",
          "animate-glow"
        ],
        aurora: [
          "bg-gradient-aurora text-white shadow-premium",
          "hover:shadow-float hover:-translate-y-1 hover:scale-105",
          "animate-gradient-xy"
        ],
        cyber: [
          "bg-gradient-cyber text-white shadow-premium",
          "hover:shadow-neon hover:-translate-y-1 hover:scale-105",
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-100%] before:hover:translate-x-[100%]",
          "before:transition-transform before:duration-500"
        ],
        morphism: [
          "neumorphism text-foreground",
          "hover:shadow-depth hover:-translate-y-0.5",
          "active:shadow-subtle active:translate-y-0"
        ],
        rainbow: [
          "bg-gradient-rainbow text-white shadow-premium",
          "hover:shadow-float hover:-translate-y-1 hover:scale-105",
          "animate-gradient-x"
        ],
        floating: [
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
          "shadow-elegant hover:shadow-float",
          "hover:-translate-y-2 hover:scale-105",
          "transition-all duration-500"
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        default: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "premium",
      size: "default",
    },
  }
);

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof premiumButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(premiumButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={cn("transition-opacity duration-300", loading && "opacity-0")}>
          {children}
        </span>
        
        {/* Sparkle effect for premium variants */}
        {(variant === "premium" || variant === "rainbow" || variant === "aurora") && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        )}
      </Comp>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton, premiumButtonVariants };