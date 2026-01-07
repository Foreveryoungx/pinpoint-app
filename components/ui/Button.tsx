import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                    {
                        "bg-primary text-black hover:bg-primary/90 shadow-[0_0_15px_rgba(0,255,157,0.3)]": variant === "primary",
                        "bg-secondary text-white hover:bg-secondary/80 border border-white/10": variant === "secondary",
                        "border border-primary/20 text-primary hover:bg-primary/10": variant === "outline",
                        "bg-alert-detox/10 text-alert-detox hover:bg-alert-detox/20 border border-alert-detox/20": variant === "danger",
                        "hover:bg-white/5 text-gray-400 hover:text-white": variant === "ghost",
                        "h-8 px-3 text-xs": size === "sm",
                        "h-10 px-4 text-sm": size === "md",
                        "h-12 px-6 text-base": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
