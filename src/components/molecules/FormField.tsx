import { ReactNode } from "react";
import { Label } from "@/components/atoms/Label";
import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { cn } from "@/lib/utils";

interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    required?: boolean;
    hint?: string;
    className?: string;
    children: ReactNode;
}

export function FormField({
    label,
    htmlFor,
    error,
    required,
    hint,
    className,
    children,
}: FormFieldProps) {
    return (
        <div className={cn("flex flex-col", className)}>
            <Label htmlFor={htmlFor} required={required}>
                {label}
            </Label>
            {hint && (
                <p className="text-xs text-[#a8a29e] mb-1.5 -mt-1">{hint}</p>
            )}
            {children}
            <ErrorMessage message={error} />
        </div>
    );
}