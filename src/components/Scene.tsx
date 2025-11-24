"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import { useEffect, useState, Suspense, useRef } from "react";
import { usePathname } from "next/navigation";
import HeroCrystal from "./HeroCrystal";
import FloatingImage from "./FloatingImage";
import * as THREE from "three";

// ★修正1: 型を定義して、positionとrotationが「必ず3つの数字」であることを保証する
type ImageDataType = {
    url: string;
    position: [number, number, number]; // 3つの数字のタプル
    rotation: [number, number, number]; // 3つの数字のタプル
    scale: number;
    speed: number;
};

// ★修正2: 定義した型を適用する
const IMAGE_DATA: ImageDataType[] = [
    { url: "/images/live1.jpg", position: [3.5, 2.0, -3], rotation: [0, -25, 5], scale: 1.4, speed: 0.15 },
    { url: "/images/live2.jpg", position: [-3.0, -2.5, 0], rotation: [0, 40, -5], scale: 1.1, speed: -0.1 },
    { url: "/images/live3.jpg", position: [0, -3.5, -5], rotation: [-10, 0, 0], scale: 1.8, speed: 0.05 },
    { url: "/images/live4.jpg", position: [-4.0, 2.5, -4], rotation: [10, 30, 10], scale: 1.5, speed: -0.12 },
    { url: "/images/live5.jpg", position: [3.0, -3.0, 1.5], rotation: [0, -40, 0], scale: 0.9, speed: 0.2 },
    { url: "/images/live6.jpg", position: [1.0, 4.0, -6], rotation: [20, 0, -10], scale: 2.0, speed: 0.08 }
];

interface Props {
    mode: "high" | "mid" | "low";
}

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

function OrbitingLight() {
    const lightRef = useRef<THREE.SpotLight>(null);
    // ... (中略: 前回のOrbitingLightと同じ) ...
    return <spotLight ref={lightRef} position={[0, 5, 0]} intensity={200} angle={0.5} penumbra={1} color="#FF8800" distance={20} decay={2} />;
}

export default function Scene({ mode }: Props) {
    const [isVisible, setIsVisible] = useState(true);
    const isMobile = useIsMobile();
    const pathname = usePathname();

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

    const dpr = mode === "high" ? [1, 2] : [1, 1];
    // position型エラー回避のためのキャスト
    const cameraPosition: [number, number, number] = isMobile ? [0, 0, 9] : [0, 0, 5];

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 bg-black pointer-events-none">
            <Canvas
                frameloop={isVisible ? "always" : "never"}
                // @ts-ignore (dprの型定義の厳密さを回避)
                dpr={dpr}
                camera={{ position: cameraPosition, fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
            >
                <fog attach="fog" args={['#000000', 5, 15]} />
                <Environment preset="city" />

                <OrbitingLight />
                <Sparkles count={200} scale={12} size={3} speed={0.4} opacity={0.5} color="#00FFFF" />

                {isHome && (
                    <Suspense fallback={null}>
                        <HeroCrystal mode={mode} />

                        {IMAGE_DATA.map((data, index) => (
                            <FloatingImage
                                key={index}
                                url={data.url}
                                // ★修正3: 型定義したので @ts-ignore が不要になりました
                                position={data.position}
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