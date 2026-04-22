import { OnboardingTemplate } from "@/components/templates/OnboardingTemplate";
import { CompanyForm } from "@/components/organisms/CompanyForm";

export default function CompanyPage() {
    return (
        <OnboardingTemplate
            step={2}
            title="Parlez-nous de votre entreprise."
            subtitle="Ces données nous permettent de comprendre votre contexte et de calibrer notre proposition."
        >
            <CompanyForm />
        </OnboardingTemplate>
    );
}