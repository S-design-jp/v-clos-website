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

    const color = new THREE.Color('#000000');

    // === 設定値 ===
    // High: 高品質
    // Mid:  中品質 (解像度とサンプルを落として軽量化)
    const transmissionConfig = mode === "high"
        ? { res: 512, samples: 6 }
        : { res: 256, samples: 4 };

    // === 1. 屈折ガラス (High/Midのコア用) ===
    // Midでもこれを使うことで「白さ」を回避し、透明感を出します
    const transmissionMaterial = (
        <MeshTransmissionMaterial
            thickness={0.5} roughness={0} transmission={1} ior={1.5}
            chromaticAberration={1} anisotropy={0.5} distortion={0.5}
            distortionScale={0.5} temporalDistortion={0.1} background={color}
            resolution={transmissionConfig.res} samples={transmissionConfig.samples}
        />
    );

    // === 2. 軽量ガラス (Midの破片用) ===
    // Transmissionを使うと破片40個は重すぎるので、Physicalを使うが、
    // 色を「白」ではなく「薄いシアン」にして違和感を消す
    const glassMaterial = (
        <meshPhysicalMaterial
            roughness={0}
            metalness={0.2}
            transmission={1}
            thickness={0.5}
            color="#ccffff"  // ほんのりシアン
            ior={1.5}
            clearcoat={1}
        />
    );

    // === 3. ホログラム (Low用) ===
    const lowMaterial = (
        <meshStandardMaterial
            color="#0088FF" emissive="#00FFFF" emissiveIntensity={0.8}
            wireframe={true} transparent={true} opacity={0.3}
        />
    );

    // === マテリアル割り当て ===
    let coreMaterial, shardMaterial;

    if (mode === "low") {
        coreMaterial = lowMaterial;
        shardMaterial = lowMaterial;
    } else if (mode === "mid") {
        coreMaterial = transmissionMaterial; // Midでもコアは屈折させる！
        shardMaterial = glassMaterial;       // 破片は軽量ガラス
    } else {
        // High
        coreMaterial = transmissionMaterial;
        shardMaterial = transmissionMaterial; // Highなら全部屈折
    }

    return (
        <>
            {/* コア: 正十二面体 (五角形の面を持つ立体) */}
            <mesh ref={coreRef}>
                <dodecahedronGeometry args={[1.2, 0]} />
                {coreMaterial}

                {/* Lowモード用の芯 */}
                {mode === "low" && (
                    <mesh>
                        <dodecahedronGeometry args={[1.15, 0]} />
                        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
                    </mesh>
                )}
            </mesh>

            {/* 破片群: 鋭利な四面体 */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
                <group ref={shardsGroupRef}>
                    {shards.map((shard, i) => (
                        <mesh key={i} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
                            <tetrahedronGeometry args={[1, 0]} />
                            {shardMaterial}
                        </mesh>
                    ))}
                </group>
            </Float>
        </>
    );
}