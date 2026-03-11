"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const SHARD_COUNT = 40;

type Shard = {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
};

interface Props {
    mode: "high" | "mid" | "low";
}

export default function HeroCrystal({ mode }: Props) {
    const shardsGroupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    const shards: Shard[] = useMemo(() => {
        return new Array(SHARD_COUNT).fill(0).map(() => {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const radius = 1.5 + Math.random() * 3.5;
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            return {
                position: [x, y, z],
                rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2],
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

    // ★修正1: カラーオブジェクトをメモ化してメモリリークを防ぐ
    const bgColor = useMemo(() => new THREE.Color('#000000'), []);

    const transmissionConfig = mode === "high"
        ? { res: 512, samples: 6 }
        : { res: 256, samples: 4 };

    return (
        <>
            <mesh ref={coreRef}>
                <dodecahedronGeometry args={[1.2, 0]} />

                {/* ★修正2: 変数に入れず、JSX内に直接マテリアルを記述してライフサイクルを正常化 */}
                {mode === "low" ? (
                    <meshStandardMaterial color="#111111" roughness={0} metalness={0.9} transparent opacity={0.3} />
                ) : (
                    <MeshTransmissionMaterial
                        thickness={0.5} roughness={0} transmission={1} ior={1.5}
                        chromaticAberration={1} anisotropy={0.5} distortion={0.5}
                        distortionScale={0.5} temporalDistortion={0.1} background={bgColor}
                        resolution={transmissionConfig.res} samples={transmissionConfig.samples}
                    />
                )}

                {mode === "low" && (
                    <mesh>
                        <dodecahedronGeometry args={[1.15, 0]} />
                        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
                    </mesh>
                )}
            </mesh>

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
                <group ref={shardsGroupRef}>
                    {shards.map((shard, i) => (
                        <mesh key={i} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
                            <tetrahedronGeometry args={[1, 0]} />
                            <meshStandardMaterial color="#111111" roughness={0} metalness={0.9} transparent opacity={0.3} />
                        </mesh>
                    ))}
                </group>
            </Float>
        </>
    );
}