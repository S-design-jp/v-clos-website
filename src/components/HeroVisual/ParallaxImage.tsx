"use client";

import { useRef, useEffect, useState } from "react";
import { useGlobalState } from "@/context/GlobalContext";

interface Props {
    images: string[]; // ★ 複数画像に対応
}

const SLIDE_INTERVAL = 5000; // 5秒で自動切り替え

export default function ParallaxImage({ images }: Props) {
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollYRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const { isStarted } = useGlobalState();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // ★ 画像切り替え処理（スクロール・タイマー共通）
    const goToNext = (next: number) => {
        if (isTransitioning) return;
        setPrevIndex(currentIndex);
        setCurrentIndex(next);
        setIsTransitioning(true);
        setTimeout(() => {
            setPrevIndex(null);
            setIsTransitioning(false);
        }, 1000); // フェード時間と合わせる
    };

    useEffect(() => {
        if (!isStarted) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(interval);
    }, [isStarted, images.length]);

    useEffect(() => {
        const handleScroll = () => {
            scrollYRef.current = window.scrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">

            {images.map((src, index) => {
                const isCurrent = index === currentIndex;
                const isPrev = index === prevIndex;

                // current/prev以外は非表示
                if (!isCurrent && !isPrev) return null;

                return (
                    <div
                        key={src}
                        ref={(el) => { imageRefs.current[index] = el; }}
                        className="absolute inset-0 origin-center will-change-transform"
                        style={{
                            // ★ currentはフェードイン、prevはフェードアウト
                            opacity: isCurrent ? 1 : 0,
                            transition: "opacity 1000ms ease-in-out",
                            zIndex: isCurrent ? 1 : 0,
                        }}
                    >
                        <img
                            src={src}
                            alt=""
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${isStarted ? "opacity-60" : "opacity-0"}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
                        <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color" />
                    </div>
                );
            })}
        </div>
    );
}