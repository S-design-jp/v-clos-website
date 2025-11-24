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

    // === 1. Highモード (中央コア専用) ===
    // 屈折あり。重厚なガラス。
    const highMaterial = (
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
            resolution={512}
            samples={6}
        />
    );

    // === 2. Midモード & 破片用 (軽量ホログラム) ===
    // ★修正: "白" ではなく "シアン色の発光体" に変更
    const glassMaterial = (
        <meshStandardMaterial
            color="#00FFFF"       // シアン色
            emissive="#004444"    // ほんのり発光させる
            emissiveIntensity={0.5}
            roughness={0.1}       // ツルツルに
            metalness={0.8}       // 金属光沢
            transparent={true}    // 透明有効
            opacity={0.4}         // 半透明
        />
    );

    // 中央のコアだけモードによって切り替える
    const coreMaterial = mode === "high" ? highMaterial : glassMaterial;

    // 破片は常に軽量マテリアルを使う
    const shardMaterial = glassMaterial;

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <group ref={groupRef}>
                {/* メインの核 */}
                <mesh>
                    <octahedronGeometry args={[1.2, 0]} />
                    {coreMaterial}
                </mesh>

                {/* 周りの破片 */}
                {shards.map((shard, i) => (
                    <mesh key={i} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
                        <tetrahedronGeometry args={[1, 0]} />
                        {shardMaterial}
                    </mesh>
                ))}
            </group>
        </Float>
    );
}