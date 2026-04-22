"use client";

import { useEffect } from "react";
import { useOnboardingStore } from "@/store/onboardingStore";

export function OfflineBanner() {
    const { isOffline, setOffline } = useOnboardingStore();

    useEffect(() => {
        const handleOnline = () => setOffline(false);
        const handleOffline = () => setOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        setOffline(!navigator.onLine);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [setOffline]);

    if (!isOffline) return null;

    return (
        <div
            role="alert"
            className="fixed top-0 left-0 right-0 z-50 bg-[#1c1917] text-[#fdf8f3] px-4 py-2.5 flex items-center justify-center gap-2 text-sm"
        >
            <svg className="w-4 h-4 shrink-0 text-[#e05a2b]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>
                Vous êtes hors ligne — vos données sont sauvegardées et envoyées automatiquement à la reconnexion.
            </span>
        </div>
    );
}