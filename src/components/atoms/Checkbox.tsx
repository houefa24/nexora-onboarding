import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, ...props }, ref) => {
        return (
            <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                    <input ref={ref} type="checkbox" className="sr-only peer" {...props} />
                    <div
                        className={cn(
                            "w-5 h-5 rounded border-2 border-[#d6d3d1] bg-white transition-all duration-150",
                            "peer-checked:bg-[#e05a2b] peer-checked:border-[#e05a2b]",
                            "peer-focus-visible:ring-2 peer-focus-visible:ring-[#e05a2b] peer-focus-visible:ring-offset-1",
                            "group-hover:border-[#a8a29e]",
                            className
                        )}
                    />
                    <svg
                        className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="text-sm text-[#44403c] group-hover:text-[#1c1917] transition-colors">
                    {label}
                </span>
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";