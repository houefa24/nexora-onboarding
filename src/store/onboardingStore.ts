import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
    ContactFormData,
    CompanyFormData,
    ProjectFormData,
    PlanningFormData,
} from "@/lib/schemas";

export type Step = 1 | 2 | 3 | 4;

interface OnboardingState {
    currentStep: Step;
    leadId: string | null;
    contact: Partial<ContactFormData>;
    company: Partial<CompanyFormData>;
    project: Partial<ProjectFormData>;
    planning: Partial<PlanningFormData>;
    isOffline: boolean;
    pendingSync: boolean;

    setStep: (step: Step) => void;
    setLeadId: (id: string) => void;
    setContact: (data: ContactFormData) => void;
    setCompany: (data: CompanyFormData) => void;
    setProject: (data: ProjectFormData) => void;
    setPlanning: (data: PlanningFormData) => void;
    setOffline: (offline: boolean) => void;
    setPendingSync: (pending: boolean) => void;
    reset: () => void;
}

const initialState = {
    currentStep: 1 as Step,
    leadId: null,
    contact: {},
    company: {},
    project: {},
    planning: {},
    isOffline: false,
    pendingSync: false,
};

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            ...initialState,
            setStep: (step) => set({ currentStep: step }),
            setLeadId: (id) => set({ leadId: id }),
            setContact: (data) => set({ contact: data }),
            setCompany: (data) => set({ company: data }),
            setProject: (data) => set({ project: data }),
            setPlanning: (data) => set({ planning: data }),
            setOffline: (offline) => set({ isOffline: offline }),
            setPendingSync: (pending) => set({ pendingSync: pending }),
            reset: () => set(initialState),
        }),
        {
            name: "nexora-onboarding",
            partialize: (state) => ({
                currentStep: state.currentStep,
                leadId: state.leadId,
                contact: state.contact,
                company: state.company,
                project: state.project,
                planning: state.planning,
                pendingSync: state.pendingSync,
            }),
        }
    )
);