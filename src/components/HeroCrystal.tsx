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
            resolution={1024}
            samples={6}
        />
    );

    const glassMaterial = (
        <meshPhysicalMaterial
            roughness={0}
            metalness={0.1}
            transmission={0.95}
            thickness={0.5}
            color="#ffffff"
            ior={1.5}
            clearcoat={1}
        />
    );

    const coreMaterial = mode === "high" ? highMaterial : glassMaterial;

    const shardMaterial = glassMaterial;

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <group ref={groupRef}>
                <mesh>
                    <octahedronGeometry args={[1.2, 0]} />
                    {coreMaterial}
                </mesh>
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