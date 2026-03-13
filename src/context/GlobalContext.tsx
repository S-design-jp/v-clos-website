"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface GlobalContextType {
    progress: number;
    setProgress: (val: number) => void;
    isLoaded: boolean;
    setIsLoaded: (val: boolean) => void;
    isStarted: boolean;
    setIsStarted: (val: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    return (
        <GlobalContext.Provider value={{
            progress, setProgress,
            isLoaded, setIsLoaded,
            isStarted, setIsStarted,
        }}>
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