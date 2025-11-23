"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const SHARD_COUNT = 40;

// Propsの定義を変更
interface Props {
    mode: "high" | "mid" | "low";
}

export default function HeroCrystal({ mode }: Props) {
    const groupRef = useRef<THREE.Group>(null);

    const shards = useMemo(() => {
        return new Array(SHARD_COUNT).fill(0).map(() => {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const radius = 1.5 + Math.random() * 3.5;
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            return {
                position: [x, y, z] as [number, number, number],
                rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2] as [number, number, number],
                scale: Math.random() * 0.4 + 0.05,
            };
        });
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y -= delta * 0.02;
            groupRef.current.rotation.z -= delta * 0.005;
        }
    });

    const color = new THREE.Color('#000000');

    // === マテリアル設定の分岐 ===
    // High: 超高画質 (解像度1024, サンプル10)
    // Mid:  標準画質 (解像度256, サンプル4) -> 4倍軽くなります
    const glassConfig = mode === "high"
        ? { resolution: 1024, samples: 10, anisotropy: 0.5 }
        : { resolution: 256, samples: 4, anisotropy: 0 };

    // 1. High / Mid 用 (屈折あり)
    const transmissionMaterial = (
        <MeshTransmissionMaterial
            thickness={0.2}
            roughness={0}
            transmission={1}
            ior={1.5}
            chromaticAberration={1.2}
            distortion={0.6}
            distortionScale={0.5}
            temporalDistortion={0.1}
            background={color}
            // ここで品質を出し分ける
            resolution={glassConfig.resolution}
            samples={glassConfig.samples}
            anisotropy={glassConfig.anisotropy}
        />
    );

    // 2. Low 用 (屈折なし・軽量)
    const lowQualityMaterial = (
        <meshStandardMaterial
            color="#00FFFF"
            emissive="#004444"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
            transparent={true}
            opacity={0.4}
        />
    );

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <group ref={groupRef}>
                <mesh>
                    <octahedronGeometry args={[1.2, 0]} />
                    {mode === "low" ? lowQualityMaterial : transmissionMaterial}
                </mesh>

                {shards.map((shard, i) => (
                    <mesh key={i} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
                        <tetrahedronGeometry args={[1, 0]} />
                        {mode === "low" ? lowQualityMaterial : transmissionMaterial}
                    </mesh>
                ))}
            </group>
        </Float>
    );
}