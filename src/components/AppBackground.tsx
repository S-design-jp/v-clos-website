"use client";

import { useEffect } from "react";
import { useGlobalState } from "@/context/GlobalContext";
import PrismCursor from "@/components/PrismCursor";
import LoadingScreen from "@/components/LoadingScreen";

export default function AppBackground() {
    const { progress, setProgress, isLoaded, setIsLoaded, isStarted, setIsStarted } = useGlobalState();

    useEffect(() => {
        const DURATION = 1500; // ★ 3Dがないので短縮
        const startTime = Date.now();

        // セッション内2回目以降はスキップ
        const hasVisited = sessionStorage.getItem("v-clos-visited");
        if (hasVisited) {
            setProgress(100);
            setIsLoaded(true);
            setIsStarted(true); // ★ クオリティ選択なしで即スタート
            return;
        }

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const percent = Math.min(100, Math.floor((elapsed / DURATION) * 100));
            setProgress(percent);

            if (percent < 100) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    setIsLoaded(true);
                    setIsStarted(true); // ★ ロード完了と同時にスタート
                    sessionStorage.setItem("v-clos-visited", "true");
                }, 300);
            }
        };
        requestAnimationFrame(animate);
    }, []);

    // スクロール制御
    useEffect(() => {
        document.body.style.overflow = isStarted ? "auto" : "hidden";
    }, [isStarted]);

    return (
        <>
            <PrismCursor />
            {!isLoaded && <LoadingScreen progress={progress} isFading={false} />}
        </>
    );
}