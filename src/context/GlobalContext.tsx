"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type QualityMode = "high" | "mid" | "low" | null;

interface GlobalContextType {
    progress: number;
    setProgress: (val: number) => void;
    isLoaded: boolean;
    setIsLoaded: (val: boolean) => void;
    qualityMode: QualityMode;
    setQualityMode: (mode: QualityMode) => void;
    isStarted: boolean;
    setIsStarted: (val: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [qualityMode, setQualityMode] = useState<QualityMode>(null);
    const [isStarted, setIsStarted] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                progress,
                setProgress,
                isLoaded,
                setIsLoaded,
                qualityMode,
                setQualityMode,
                isStarted,
                setIsStarted,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalState() {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalProvider");
    }
    return context;
}