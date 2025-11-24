"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import HeroCrystal from "./HeroCrystal";
import FloatingImage from "./FloatingImage";

const IMAGE_DATA = [
    { url: "/images/live1.jpg", position: [3.5, 2.0, -3], rotation: [0, -25, 5], scale: 1.4, speed: 0.15 },
    { url: "/images/live2.jpg", position: [-3.0, -2.5, 0], rotation: [0, 40, -5], scale: 1.1, speed: -0.1 },
    { url: "/images/live3.jpg", position: [0, -3.5, -5], rotation: [-10, 0, 0], scale: 1.8, speed: 0.05 },
    { url: "/images/live1.jpg", position: [-4.0, 2.5, -4], rotation: [10, 30, 10], scale: 1.5, speed: -0.12 },
    { url: "/images/live2.jpg", position: [3.0, -3.0, 1.5], rotation: [0, -40, 0], scale: 0.9, speed: 0.2 },
    { url: "/images/live3.jpg", position: [1.0, 4.0, -6], rotation: [20, 0, -10], scale: 2.0, speed: 0.08 }
];

interface Props {
    mode: "high" | "mid" | "low";
}

// スマホ判定フック
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    return isMobile;
}

export default function Scene({ mode }: Props) {
    const [isVisible, setIsVisible] = useState(true);
    const isMobile = useIsMobile();
    const pathname = usePathname();

    // トップページのみ3Dオブジェクトを表示
    const isHome = pathname === "/";

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsVisible(document.visibilityState === "visible");
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // === Lowモード (軽量版: 3D停止) ===
    if (mode === "low") {
        return (
            <div className="fixed top-0 left-0 w-full h-full z-0 bg-black pointer-events-none overflow-hidden">
                {/* トップページなら背景画像あり */}
                {isHome && (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{ backgroundImage: "url(/images/live1.jpg)" }}
                    />
                )}
                {/* グリッド装飾 */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                {/* フェード */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>
        );
    }

    // === High / Mid モード (3D有効) ===
    const dpr = mode === "high" ? [1, 2] : [1, 1];
    const cameraPosition = isMobile ? [0, 0, 9] : [0, 0, 5];

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 bg-black pointer-events-none">
            <Canvas
                frameloop={isVisible ? "always" : "never"}
                // @ts-ignore
                dpr={dpr}
                // @ts-ignore
                camera={{ position: cameraPosition, fov: 45 }}
                gl={{
                    // エフェクトを削除したので、アンチエイリアスは常にONでOK
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
            >
                <fog attach="fog" args={['#000000', 5, 15]} />
                <Environment preset="city" />

                <Sparkles count={200} scale={12} size={3} speed={0.4} opacity={0.5} color="#00FFFF" />

                {/* トップページのみ結晶と画像を表示 */}
                {isHome && (
                    <Suspense fallback={null}>
                        <HeroCrystal mode={mode} />

                        {IMAGE_DATA.map((data, index) => (
                            <FloatingImage
                                key={index}
                                url={data.url}
                                // @ts-ignore
                                position={data.position}
                                // @ts-ignore
                                rotation={data.rotation}
                                scale={data.scale}
                                speed={data.speed}
                            />
                        ))}
                    </Suspense>
                )}
            </Canvas>
        </div>
    );
}