"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { companySchema, type CompanyFormData, companySizeValues, companySizeLabels } from "@/lib/schemas";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { FormField } from "@/components/molecules/FormField";

const SECTORS = [
    "SaaS / Logiciel", "Fintech", "Healthtech", "E-commerce / Retail",
    "Edtech", "Greentech / Cleantech", "Marketplace", "Deeptech / IA",
    "Medtech", "Autre",
];

export function CompanyForm() {
    const router = useRouter();
    const { setCompany, setStep, leadId, isOffline, setPendingSync, company } =
        useOnboardingStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
        defaultValues: company as CompanyFormData,
    });

    const onSubmit = async (data: CompanyFormData) => {
        setIsLoading(true);
        setCompany(data);

        try {
            if (!isOffline && leadId) {
                await fetch("/api/leads/company", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ leadId, ...data }),
                });
            } else {
                setPendingSync(true);
            }
        } catch {
            setPendingSync(true);
        } finally {
            setStep(3);
            router.push("/metier");
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            data-cy="company-form"
            noValidate
        >
            <FormField label="Nom de l'entreprise" htmlFor="name" error={errors.name?.message} required>
                <Input
                    id="name"
                    placeholder="Acme Inc."
                    hasError={!!errors.name}
                    autoComplete="organization"
                    data-cy="input-company-name"
                    {...register("name")}
                />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Secteur d'activité" htmlFor="sector" error={errors.sector?.message} required>
                    <Select id="sector" hasError={!!errors.sector} data-cy="select-sector" {...register("sector")}>
                        <option value="">Sélectionner...</option>
                        {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </FormField>

                <FormField label="Taille de l'entreprise" htmlFor="size" error={errors.size?.message} required>
                    <Select id="size" hasError={!!errors.size} data-cy="select-size" {...register("size")}>
                        <option value="">Sélectionner...</option>
                        {companySizeValues.map((v) => (
                            <option key={v} value={v}>{companySizeLabels[v]}</option>
                        ))}
                    </Select>
                </FormField>
            </div>

            <FormField label="SIRET" htmlFor="siret" error={errors.siret?.message} hint="14 chiffres, sans espaces">
                <Input
                    id="siret"
                    placeholder="12345678901234"
                    hasError={!!errors.siret}
                    maxLength={14}
                    data-cy="input-siret"
                    {...register("siret")}
                />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Site web" htmlFor="website" error={errors.website?.message}>
                    <Input
                        id="website"
                        type="url"
                        placeholder="https://monentreprise.io"
                        hasError={!!errors.website}
                        autoComplete="url"
                        data-cy="input-website"
                        {...register("website")}
                    />
                </FormField>

                <FormField label="Ville" htmlFor="city" error={errors.city?.message}>
                    <Input
                        id="city"
                        placeholder="Paris"
                        hasError={!!errors.city}
                        autoComplete="address-level2"
                        data-cy="input-city"
                        {...register("city")}
                    />
                </FormField>
            </div>

            <div className="flex gap-3 pt-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={() => { setStep(1); router.push("/"); }}
                    className="flex-1"
                >
                    Retour
                </Button>
                <Button type="submit" size="lg" isLoading={isLoading} className="flex-[2]" data-cy="btn-next-company">
                    Continuer
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Button>
            </div>
        </form>
    );
}