import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ hasError, className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "w-full rounded-lg px-4 py-3 text-[#1c1917] text-base",
                    "bg-white border transition-all duration-150",
                    "placeholder:text-[#a8a29e]",
                    "focus:outline-none focus:ring-2 focus:ring-[#e05a2b] focus:border-transparent",
                    hasError
                        ? "border-red-400 bg-red-50 focus:ring-red-300"
                        : "border-[#e7e5e4] hover:border-[#d6d3d1]",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";