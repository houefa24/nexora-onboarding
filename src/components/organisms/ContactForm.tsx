"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";

export function ContactForm() {
    const router = useRouter();
    const { setContact, setLeadId, setStep, isOffline, setPendingSync, contact } =
        useOnboardingStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: contact as ContactFormData,
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsLoading(true);
        setContact(data);

        try {
            if (isOffline) {
                setPendingSync(true);
                setStep(2);
                router.push("/company");
                return;
            }

            const res = await fetch("/api/leads/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Erreur API");

            const { leadId } = await res.json();
            setLeadId(leadId);
            setStep(2);
            router.push("/company");
        } catch {
            setPendingSync(true);
            setStep(2);
            router.push("/company");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            data-cy="contact-form"
            noValidate
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Prénom" htmlFor="firstName" error={errors.firstName?.message} required>
                    <Input
                        id="firstName"
                        placeholder="Marie"
                        hasError={!!errors.firstName}
                        autoComplete="given-name"
                        data-cy="input-firstName"
                        {...register("firstName")}
                    />
                </FormField>

                <FormField label="Nom" htmlFor="lastName" error={errors.lastName?.message} required>
                    <Input
                        id="lastName"
                        placeholder="Dupont"
                        hasError={!!errors.lastName}
                        autoComplete="family-name"
                        data-cy="input-lastName"
                        {...register("lastName")}
                    />
                </FormField>
            </div>

            <FormField label="Email professionnel" htmlFor="email" error={errors.email?.message} required>
                <Input
                    id="email"
                    type="email"
                    placeholder="marie.dupont@startup.io"
                    hasError={!!errors.email}
                    autoComplete="email"
                    data-cy="input-email"
                    {...register("email")}
                />
            </FormField>

            <FormField
                label="Téléphone"
                htmlFor="phone"
                error={errors.phone?.message}
                hint="Format FR : 0612345678"
            >
                <Input
                    id="phone"
                    type="tel"
                    placeholder="0612345678"
                    hasError={!!errors.phone}
                    autoComplete="tel"
                    data-cy="input-phone"
                    {...register("phone")}
                />
            </FormField>

            <FormField
                label="Votre poste"
                htmlFor="role"
                error={errors.role?.message}
                hint="Ex : CTO, Directeur technique, Lead dev..."
            >
                <Input
                    id="role"
                    placeholder="CTO"
                    hasError={!!errors.role}
                    autoComplete="organization-title"
                    data-cy="input-role"
                    {...register("role")}
                />
            </FormField>

            <div className="pt-2">
                <Button
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full"
                    data-cy="btn-next-contact"
                >
                    Continuer
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Button>
            </div>
        </form>
    );
}