import { ReactNode } from "react";
import { StepIndicator } from "@/components/molecules/StepIndicator";
import type { Step } from "@/store/onboardingStore";

interface OnboardingTemplateProps {
  step: Step;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function OnboardingTemplate({
  step,
  title,
  subtitle,
  children,
}: OnboardingTemplateProps) {
  return (
    <main className="min-h-screen bg-[#fdf8f3] flex flex-col items-center justify-start px-4 py-8 sm:py-12">
      {/* Logo */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1c1917] flex items-center justify-center">
            <svg className="w-4 h-4 text-[#e05a2b]" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm9 2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-[#1c1917] tracking-tight">
            Nexora
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="w-full max-w-lg">
        {/* Step indicator */}
        <div className="mb-8">
          <StepIndicator currentStep={step} />
        </div>

        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1c1917] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-[#78716c] text-base leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Formulaire */}
        {children}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-xs text-[#a8a29e]">
          © {new Date().getFullYear()} Nexora · Vos données sont traitées de façon confidentielle
        </p>
      </footer>
    </main>
  );
}