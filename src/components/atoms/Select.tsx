import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ hasError, className, children, ...props }, ref) => {
        return (
            <div className="relative">
                <select
                    ref={ref}
                    className={cn(
                        "w-full rounded-lg px-4 py-3 text-[#1c1917] text-base appearance-none",
                        "bg-white border transition-all duration-150 cursor-pointer",
                        "focus:outline-none focus:ring-2 focus:ring-[#e05a2b] focus:border-transparent",
                        hasError
                            ? "border-red-400 bg-red-50"
                            : "border-[#e7e5e4] hover:border-[#d6d3d1]",
                        className
                    )}
                    {...props}
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-4 h-4 text-[#a8a29e]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        );
    }
);

Select.displayName = "Select";