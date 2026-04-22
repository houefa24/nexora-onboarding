import { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

export function Label({ required, className, children, ...props }: LabelProps) {
    return (
        <label
            className={cn("block text-sm font-medium text-[#44403c] mb-1.5", className)}
            {...props}
        >
            {children}
            {required && <span className="text-[#e05a2b] ml-1">*</span>}
        </label>
    );
}