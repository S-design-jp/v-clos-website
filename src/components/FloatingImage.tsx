"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

interface Props {
    url: string;
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    speed?: number;
}

export default function FloatingImage({
    url,
    position,
    rotation = [0, 0, 0],
    scale = 1,
    speed = 0.1
}: Props) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, url);

    // 初期位置から「中心との距離（半径）」と「開始角度」を計算して記憶しておく
    const { radius, initialAngle } = useMemo(() => {
        const x = position[0];
        const z = position[2];
        return {
            radius: Math.sqrt(x * x + z * z), // 三平方の定理で半径を出す
            initialAngle: Math.atan2(z, x)    // アークタンジェントで角度を出す
        };
    }, [position]);

    useFrame((state) => {
        if (!meshRef.current) return;

        // 時間経過とともに角度を進める（これが公転）
        // speedを少し弱めて、ゆったり回るように調整しています (* 0.5)
        const currentAngle = initialAngle + state.clock.elapsedTime * speed * 0.5;

        // 新しい位置を計算 (円運動)
        meshRef.current.position.x = Math.cos(currentAngle) * radius;
        meshRef.current.position.z = Math.sin(currentAngle) * radius;

        // 上下の浮遊はそのまま残す
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 2) * 0.2;

        // ★自転（rotation.y += ...）のコードは削除しました
        // これにより、画像自体は回らず、向きを固定したまま移動します

        // (オプション) もし「常に中心（結晶）の方を向かせたい」場合は以下のコメントを外してください
        // meshRef.current.lookAt(0, position[1], 0);
    });

    return (
        <mesh
            ref={meshRef}
            // 初期の配置位置は useFrame で上書きされるので、ここでは rotation と scale だけ適用
            rotation={rotation.map(r => r * Math.PI / 180) as [number, number, number]}
            scale={[scale * 1.6, scale * 0.9, 1]}
        >
            <planeGeometry args={[1, 1]} />

            <meshBasicMaterial
                map={texture}
                transparent={true}
                opacity={0.8}
                side={THREE.DoubleSide} // 裏側も見せる
                toneMapped={false}
            />
        </mesh>
    );
}