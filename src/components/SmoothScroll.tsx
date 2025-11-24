"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScroll() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // Lenisのインスタンスを保存しておく箱
    const lenisRef = useRef<Lenis | null>(null);

    // 1. Lenisの初期化とループ処理
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        lenisRef.current = lenis; // インスタンスを保存

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // 2. ページ移動（パス変更）検知時にトップへ戻す
    useEffect(() => {
        if (lenisRef.current) {
            // immediate: true でアニメーションなしで瞬時に移動させる
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname, searchParams]); // URLが変わるたびに発動

    return null;
}