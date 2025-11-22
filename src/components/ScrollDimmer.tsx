"use client";

import { useEffect, useState } from "react";

export default function ScrollDimmer() {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // 計算ロジック:
            // ヒーローセクションの半分(0.5)を過ぎたあたりから暗くなり始め、
            // NEWSセクションに入る頃(1.0)にはかなり暗く(0.85)する。
            const start = windowHeight * 0.3; // 暗くなり始める位置
            const end = windowHeight * 0.8;   // 暗くなりきる位置

            // 0.0 〜 0.85 の間で透明度を算出
            let newOpacity = (scrollY - start) / (end - start);

            // 範囲制限
            if (newOpacity < 0) newOpacity = 0;
            if (newOpacity > 0.85) newOpacity = 0.85; // 最大の暗さ (0.85推奨)

            setOpacity(newOpacity);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black pointer-events-none transition-opacity duration-300 ease-out"
            style={{
                opacity: opacity,
                zIndex: 5 // 重要: 3D背景(0)より手前、コンテンツ(10)より奥
            }}
        />
    );
}