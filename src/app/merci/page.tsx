"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboardingStore";
import { OnboardingTemplate } from "@/components/templates/OnboardingTemplate";
import { Button } from "@/components/atoms/Button";

export default function MerciPage() {
    const router = useRouter();
    const {
        contact,
        leadId,
        pendingSync,
        isOffline,
        setLeadId,
        setPendingSync,
        reset,
        company,
        project,
        planning,
    } = useOnboardingStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sync différée : on renvoie tout dès le retour réseau
    useEffect(() => {
        if (!mounted || !isOffline) return;

        const sync = async () => {
            try {
                // 1. Contact si pas encore envoyé
                let currentLeadId = leadId;
                if (!currentLeadId && contact.email) {
                    const res = await fetch("/api/leads/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact),
                    });
                    if (res.ok) {
                        const { leadId: newId } = await res.json();
                        currentLeadId = newId;
                        setLeadId(newId);
                    }
                }

                if (!currentLeadId) return;

                // 2. Entreprise
                if (company.name) {
                    await fetch("/api/leads/company", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ leadId: currentLeadId, ...company }),
                    });
                }

                // 3. Projet + planification
                if (project.description && project.description.length >= 20) {
                    await fetch("/api/leads/project", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            leadId: currentLeadId,
                            ...project,
                            ...planning,
                        }),
                    });
                }

                if (pendingSync) setPendingSync(false);
            } catch {
                // On réessaiera au prochain render
            }
        };

        sync();
    }, [mounted, pendingSync, isOffline, leadId, contact, company, project, planning, setLeadId, setPendingSync]);

    return (
        <OnboardingTemplate
            step={4}
            title={`Merci ${contact.firstName || ""} !`}
            subtitle="Votre demande a bien été enregistrée. Un expert Nexora vous contactera sous 24h ouvrées."
        >
            <div className="space-y-6">
                {/* Récapitulatif */}
                <div className="bg-white rounded-xl border border-[#e7e5e4] p-5 space-y-4">
                    <h2 className="text-sm font-semibold text-[#44403c] uppercase tracking-wide">
                        Récapitulatif
                    </h2>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#a8a29e]">Contact</span>
                            <span className="text-[#1c1917] font-medium">
                                {contact.firstName} {contact.lastName}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#a8a29e]">Email</span>
                            <span className="text-[#1c1917]">{contact.email}</span>
                        </div>
                        {company.name && (
                            <div className="flex justify-between text-sm">
                                <span className="text-[#a8a29e]">Entreprise</span>
                                <span className="text-[#1c1917]">{company.name}</span>
                            </div>
                        )}
                        {project.budget && (
                            <div className="flex justify-between text-sm">
                                <span className="text-[#a8a29e]">Budget</span>
                                <span className="text-[#1c1917]">{project.budget}</span>
                            </div>
                        )}
                        {project.timeline && (
                            <div className="flex justify-between text-sm">
                                <span className="text-[#a8a29e]">Délai</span>
                                <span className="text-[#1c1917]">{project.timeline}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Statut sync */}
                {pendingSync && (
                    <div className="flex items-center gap-2 text-sm text-[#78716c] bg-[#f5f5f4] rounded-lg px-4 py-3">
                        <svg className="w-4 h-4 text-[#e05a2b] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        Synchronisation en attente — vos données seront envoyées à la reconnexion.
                    </div>
                )}

                {/* Nouvelle demande */}
                <Button
                    variant="ghost"
                    size="md"
                    className="w-full"
                    onClick={() => {
                        reset();
                        router.push("/");
                    }}
                >
                    Soumettre une nouvelle demande
                </Button>
            </div>
        </OnboardingTemplate>
    );
}