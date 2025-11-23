"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PrismCursor() {
    const mainRef = useRef<HTMLDivElement>(null);
    const cyanRef = useRef<HTMLDivElement>(null);
    const magentaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            gsap.to(mainRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out",
            });

            gsap.to(cyanRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.25,
                ease: "power2.out",
            });

            gsap.to(magentaRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.4,
                ease: "power2.out",
            });
        };

        gsap.set([mainRef.current, cyanRef.current, magentaRef.current], {
            x: -100, y: -100
        });

        window.addEventListener("mousemove", onMouseMove);
        document.body.style.cursor = "none";

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.body.style.cursor = "auto";
        };
    }, []);

    // 修正: z-50, z-40 などを z-[9999] クラスに変更して最前面にします
    // Tailwindの 'hidden md:block' を追加
    // hidden: デフォルト（スマホ）で非表示
    // md:block: 画面幅768px以上（PC/タブレット）で表示
    const baseStyle = "hidden md:block fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2";

    return (
        <>
            {/* 1. メインの芯 (White) */}
            <div
                ref={mainRef}
                className={`${baseStyle} z-[9999] w-3 h-3 bg-white mix-blend-difference`}
            />

            {/* 2. 枠線 (Magenta) */}
            <div
                ref={magentaRef}
                className={`${baseStyle} z-[9998] w-8 h-8 border-[1px] border-[#FF00FF] opacity-80 mix-blend-screen`}
            />

            {/* 3. 枠線 (Cyan) */}
            <div
                ref={cyanRef}
                className={`${baseStyle} z-[9998] w-8 h-8 border-[1px] border-[#00FFFF] opacity-80 mix-blend-screen`}
            />
        </>
    );
}