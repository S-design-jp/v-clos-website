"use client";

import { useEffect } from "react";
import { useGlobalState } from "@/context/GlobalContext";
import Scene from "@/components/Scene";
import PrismCursor from "@/components/PrismCursor";
import ScrollDimmer from "@/components/ScrollDimmer";
import LoadingScreen from "@/components/LoadingScreen";
import QualitySelector from "@/components/QualitySelector";

export default function AppBackground() {
    const {
        progress, setProgress,
        isLoaded, setIsLoaded,
        qualityMode, setQualityMode,
        isStarted, setIsStarted
    } = useGlobalState();

    // === ローディング & 初期化ロジック (page.tsxから移動) ===
    useEffect(() => {
        const DURATION = 2500;
        const startTime = Date.now();

        // スキップ判定
        const hasVisited = sessionStorage.getItem("v-clos-visited");
        if (hasVisited) {
            setProgress(100);
            setIsLoaded(true);
            const savedMode = localStorage.getItem("v-clos-quality") as "high" | "mid" | "low" | null;
            if (savedMode) {
                setQualityMode(savedMode);
                setIsStarted(true);
            }
            return;
        }

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const percent = Math.min(100, Math.floor((elapsed / DURATION) * 100));

            setProgress(percent);

            if (percent < 100) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    setIsLoaded(true);
                    sessionStorage.setItem("v-clos-visited", "true");
                }, 500);
            }
        };
        requestAnimationFrame(animate);
    }, []);

    // モード選択処理
    const handleSelectMode = (mode: "high" | "mid" | "low") => {
        setQualityMode(mode);
        localStorage.setItem("v-clos-quality", mode);
        setTimeout(() => {
            setIsStarted(true);
        }, 300);
    };

    // スクロール制御
    useEffect(() => {
        // isStartedがfalseの間はスクロール禁止
        document.body.style.overflow = isStarted ? "auto" : "hidden";
    }, [isStarted]);

    return (
        <>
            {/* カーソル (最前面・固定) */}
            <PrismCursor />

            {/* ローディング画面 */}
            {!isLoaded && <LoadingScreen progress={progress} isFading={false} />}

            {/* モード選択画面 */}
            {isLoaded && !qualityMode && (
                <QualitySelector onSelect={handleSelectMode} />
            )}

            {/* 3Dシーン & 背景 (モード決定後) */}
            {qualityMode && (
                <>
                    <div className={`fixed inset-0 z-[60] bg-black pointer-events-none transition-opacity duration-1000 ${isStarted ? "opacity-0" : "opacity-100"}`} />
                    <Scene mode={qualityMode} />
                    <ScrollDimmer />
                </>
            )}
        </>
    );
}