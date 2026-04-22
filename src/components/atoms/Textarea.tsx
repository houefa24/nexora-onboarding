import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ hasError, className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "w-full rounded-lg px-4 py-3 text-[#1c1917] text-base resize-none",
                    "bg-white border transition-all duration-150",
                    "placeholder:text-[#a8a29e]",
                    "focus:outline-none focus:ring-2 focus:ring-[#e05a2b] focus:border-transparent",
                    hasError
                        ? "border-red-400 bg-red-50"
                        : "border-[#e7e5e4] hover:border-[#d6d3d1]",
                    className
                )}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";