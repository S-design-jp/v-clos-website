"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2, // スクロールの長さ（大きいほど余韻が長い）
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // イージング関数
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true, // ホイールでの慣性を有効に
        });

        // アニメーションループ
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // クリーンアップ
        return () => {
            lenis.destroy();
        };
    }, []);

    return null; // UIは持たないのでnullを返す
}