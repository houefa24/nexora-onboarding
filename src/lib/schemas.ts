import { z } from "zod";

// ─── Étape 1 : Contact ───────────────────────────────────────────────────────
export const contactSchema = z.object({
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").max(50),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(50),
    email: z.string().email("Adresse email invalide"),
    phone: z
        .string()
        .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro invalide (format FR)")
        .optional()
        .or(z.literal("")),
    role: z.string().max(100).optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Étape 2 : Entreprise ────────────────────────────────────────────────────
export const companySizeValues = ["MICRO", "SMALL", "MEDIUM", "LARGE"] as const;

export const companySizeLabels: Record<(typeof companySizeValues)[number], string> = {
    MICRO: "1–9 collaborateurs",
    SMALL: "10–49 collaborateurs",
    MEDIUM: "50–249 collaborateurs",
    LARGE: "250+ collaborateurs",
};

export const companySchema = z.object({
    name: z.string().min(2, "Nom de l'entreprise requis").max(100),
    siret: z
        .string()
        .regex(/^\d{14}$/, "SIRET invalide (14 chiffres)")
        .optional()
        .or(z.literal("")),
    website: z.string().url("URL invalide").optional().or(z.literal("")),
    sector: z.string().min(2, "Secteur requis"),
    size: z.enum(companySizeValues, {
        error: "Taille d'entreprise requise",
    }),
    city: z.string().max(100).optional().or(z.literal("")),
});

export type CompanyFormData = z.infer<typeof companySchema>;

// ─── Étape 3 : Métier ────────────────────────────────────────────────────────
export const projectNeedsOptions = [
    "Intégration CRM",
    "Développement sur-mesure",
    "Architecture cloud",
    "Migration legacy",
    "Intégration API tierce",
    "Audit technique",
    "Formation équipe",
    "Support & maintenance",
] as const;

export const budgetOptions = [
    "< 10 000 €",
    "10 000 – 30 000 €",
    "30 000 – 80 000 €",
    "80 000 – 200 000 €",
    "> 200 000 €",
    "À définir",
] as const;

export const timelineOptions = [
    "Moins d'un mois",
    "1 à 3 mois",
    "3 à 6 mois",
    "6 à 12 mois",
    "Plus d'un an",
    "Flexible",
] as const;

export const projectSchema = z.object({
    needs: z.array(z.string()).min(0),
    description: z
        .string()
        .min(20, "Décrivez votre projet en au moins 20 caractères")
        .max(1000),
    budget: z.enum(budgetOptions).optional(),
    timeline: z.enum(timelineOptions).optional(),
    currentStack: z.string().max(200).optional().or(z.literal("")),
    teamSize: z.number().int().positive().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// ─── Étape 4 : Planification ─────────────────────────────────────────────────
export const planningSchema = z.object({
    preferredDate: z.string().optional().or(z.literal("")),
    additionalNotes: z.string().max(500).optional().or(z.literal("")),
});

export type PlanningFormData = z.infer<typeof planningSchema>;