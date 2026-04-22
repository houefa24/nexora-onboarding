"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { projectSchema, type ProjectFormData, budgetOptions, timelineOptions } from "@/lib/schemas";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Textarea } from "@/components/atoms/Textarea";
import { FormField } from "@/components/molecules/FormField";
import { NeedsSelector } from "@/components/molecules/NeedsSelector";

export function ProjectForm() {
    const router = useRouter();
    const { setProject, setStep, isOffline, setPendingSync, project } = useOnboardingStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: { ...(project as ProjectFormData), needs: (project as ProjectFormData)?.needs ?? [] },
    });

    const onSubmit = (data: ProjectFormData) => {
        setProject(data);
        setStep(4);
        router.push("/merci");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            data-cy="project-form"
            noValidate
        >
            <FormField
                label="Vos besoins"
                htmlFor="needs"
                error={errors.needs?.message}
                required
                hint="Sélectionnez tout ce qui s'applique"
            >
                <Controller
                    name="needs"
                    control={control}
                    render={({ field }) => (
                        <NeedsSelector
                            selected={field.value ?? []}
                            onChange={(values) => field.onChange(values)}
                            error={errors.needs?.message}
                        />
                    )}
                />
            </FormField>

            <FormField
                label="Décrivez votre projet"
                htmlFor="description"
                error={errors.description?.message}
                required
                hint="Contexte, objectifs, contraintes techniques..."
            >
                <Textarea
                    id="description"
                    placeholder="Nous cherchons à intégrer notre CRM avec notre outil de facturation..."
                    rows={4}
                    hasError={!!errors.description}
                    data-cy="textarea-description"
                    {...register("description")}
                />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Budget envisagé" htmlFor="budget" error={errors.budget?.message}>
                    <Select id="budget" hasError={!!errors.budget} data-cy="select-budget" {...register("budget")}>
                        <option value="">Non défini</option>
                        {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                    </Select>
                </FormField>

                <FormField label="Délai souhaité" htmlFor="timeline" error={errors.timeline?.message}>
                    <Select id="timeline" hasError={!!errors.timeline} data-cy="select-timeline" {...register("timeline")}>
                        <option value="">Non défini</option>
                        {timelineOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </Select>
                </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Stack technique actuelle" htmlFor="currentStack" error={errors.currentStack?.message} hint="Ex : React, Node.js, AWS...">
                    <Input
                        id="currentStack"
                        placeholder="React, Node.js, PostgreSQL"
                        hasError={!!errors.currentStack}
                        data-cy="input-stack"
                        {...register("currentStack")}
                    />
                </FormField>

                <FormField label="Taille de l'équipe tech" htmlFor="teamSize" error={errors.teamSize?.message} hint="Nombre de développeurs">
                    <Input
                        id="teamSize"
                        type="number"
                        min={1}
                        placeholder="5"
                        hasError={!!errors.teamSize}
                        data-cy="input-teamSize"
                        {...register("teamSize", { valueAsNumber: true })}
                    />
                </FormField>
            </div>

            <div className="flex gap-3 pt-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={() => { setStep(2); router.push("/company"); }}
                    className="flex-1"
                >
                    Retour
                </Button>
                <Button type="submit" size="lg" isLoading={isLoading} className="flex-[2]" data-cy="btn-next-project">
                    Continuer
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Button>
            </div>
        </form>
    );
}