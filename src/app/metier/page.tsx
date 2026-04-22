import { OnboardingTemplate } from "@/components/templates/OnboardingTemplate";
import { ProjectForm } from "@/components/organisms/ProjectForm";

export default function MetierPage() {
    return (
        <OnboardingTemplate
            step={3}
            title="Votre projet en détail."
            subtitle="Plus vous êtes précis, plus notre réponse sera adaptée à vos enjeux réels."
        >
            <ProjectForm />
        </OnboardingTemplate>
    );
}