import { cn } from "@/lib/utils";
import type { Step } from "@/store/onboardingStore";

const STEPS = [
    { number: 1 as Step, label: "Contact" },
    { number: 2 as Step, label: "Entreprise" },
    { number: 3 as Step, label: "Projet" },
    { number: 4 as Step, label: "Confirmation" },
];

interface StepIndicatorProps {
    currentStep: Step;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <nav aria-label="Étapes du formulaire">
            <ol className="w-full">
                <li className="relative flex items-center justify-between mb-3">
                    {/* Ligne de fond */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-[#e7e5e4]" />
                    {/* Ligne de progression */}
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-[#e05a2b] transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                    />
                    {STEPS.map((step) => {
                        const isDone = step.number < currentStep;
                        const isCurrent = step.number === currentStep;
                        return (
                            <div key={step.number} className="relative z-10 flex flex-col items-center">
                                <div
                                    aria-current={isCurrent ? "step" : undefined}
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                                        isDone
                                            ? "bg-[#e05a2b] text-[#fdf8f3] shadow-sm"
                                            : isCurrent
                                                ? "bg-white border-2 border-[#e05a2b] text-[#e05a2b] shadow-md"
                                                : "bg-white border border-[#e7e5e4] text-[#a8a29e]"
                                    )}
                                >
                                    {isDone ? (
                                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                            <path fillRule="evenodd" d="M13.707 4.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L6 10.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        step.number
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </li>

                {/* Labels */}
                <li className="flex justify-between">
                    {STEPS.map((step) => {
                        const isCurrent = step.number === currentStep;
                        const isDone = step.number < currentStep;
                        return (
                            <span
                                key={step.number}
                                className={cn(
                                    "text-xs transition-colors duration-300",
                                    isCurrent
                                        ? "text-[#e05a2b] font-medium"
                                        : isDone
                                            ? "text-[#78716c]"
                                            : "text-[#d6d3d1]"
                                )}
                            >
                                {step.label}
                            </span>
                        );
                    })}
                </li>
            </ol>
        </nav>
    );
}