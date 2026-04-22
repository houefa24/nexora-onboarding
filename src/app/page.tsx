import { OnboardingTemplate } from "@/components/templates/OnboardingTemplate";
import { ContactForm } from "@/components/organisms/ContactForm";

export default function ContactPage() {
  return (
    <OnboardingTemplate
      step={1}
      title="Faisons connaissance."
      subtitle="Ces informations nous permettent de vous contacter rapidement et de personnaliser notre réponse."
    >
      <ContactForm />
    </OnboardingTemplate>
  );
}