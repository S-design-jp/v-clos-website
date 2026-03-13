"use client";

import dynamic from "next/dynamic";

const ParallaxImage = dynamic(() => import("./ParallaxImage"), { ssr: false });

interface Props {
    images: string[]; // ★ mode削除
}

export default function HeroVisual({ images }: Props) {
    return <ParallaxImage images={images} />;
}