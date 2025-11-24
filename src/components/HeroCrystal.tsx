"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const SHARD_COUNT = 40;

interface Props {
    mode: "high" | "mid" | "low";
}

export default function HeroCrystal({ mode }: Props) {
    const shardsGroupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);

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
        if (shardsGroupRef.current) {
            shardsGroupRef.current.rotation.y -= delta * 0.02;
            shardsGroupRef.current.rotation.z -= delta * 0.005;
        }

        if (coreRef.current) {
            const scrollY = window.scrollY;
            const progress = Math.min(scrollY / 500, 1);

            const targetX = THREE.MathUtils.lerp(0, -3.5, progress);
            const targetY = THREE.MathUtils.lerp(0, -1.0, progress);
            const targetZ = THREE.MathUtils.lerp(0, 1.0, progress);
            coreRef.current.position.set(targetX, targetY, targetZ);

            const targetScale = THREE.MathUtils.lerp(0.5, 4.0, progress);
            coreRef.current.scale.setScalar(targetScale);

            coreRef.current.rotation.y += delta * 0.1;
            coreRef.current.rotation.z += delta * 0.05;
            coreRef.current.rotation.x = scrollY * 0.0005;
        }
    });

    const color = new THREE.Color('#000000');

    // === 設定値の出し分け ===
    // High: 解像度512, サンプル6 (超美麗)
    // Mid:  解像度256, サンプル3 (少し粗いが屈折する。負荷はHighの約半分)
    const config = mode === "high"
        ? { res: 512, samples: 6 }
        : { res: 256, samples: 3 };

    // === 1. 屈折ガラスマテリアル (High / Mid 共通) ===
    // 設定値(config)だけ切り替えて、どちらも「歪むガラス」にする
    const transmissionMaterial = (
        <MeshTransmissionMaterial
            thickness={0.5}
            roughness={0}
            transmission={1}
            ior={1.5}
            chromaticAberration={1}
            anisotropy={0.5}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            background={color}
            resolution={config.res}     // 可変
            samples={config.samples}    // 可変
        />
    );

    // === 2. 軽量ホログラムマテリアル (Lowのみ) ===
    const lowMaterial = (
        <meshStandardMaterial
            color="#00FFFF"
            emissive="#004444"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
            transparent={true}
            opacity={0.6}
        />
    );

    // モード判定
    const isLow = mode === "low";

    // High/Midなら屈折ガラス、Lowならホログラム
    const materialToUse = isLow ? lowMaterial : transmissionMaterial;

    return (
        <>
            {/* コア */}
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[1, 0]} />
                {materialToUse}
            </mesh>

            {/* 破片群 */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
                <group ref={shardsGroupRef}>
                    {shards.map((shard, i) => (
                        <mesh key={i} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
                            <tetrahedronGeometry args={[1, 0]} />
                            {materialToUse}
                        </mesh>
                    ))}
                </group>
            </Float>
        </>
    );
}