"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/GlobalContext";

interface Props {
    images: string[];
}

const SLIDE_INTERVAL = 5000;
export default function ParallaxImage({ images }: Props) {
    const { isStarted } = useGlobalState();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!isStarted) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(interval);
    }, [isStarted, images.length]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {images.map((src, index) => {
                const isCurrent = index === currentIndex;

                return (
                    <div
                        key={src}
                        className="absolute inset-0"
                        style={{
                            opacity: isCurrent ? 1 : 0,
                            transition: "opacity 1000ms ease-in-out",
                            zIndex: isCurrent ? 1 : 0,
                        }}
                    >
                        <Image
                            src={src}
                            alt=""
                            fill
                            sizes="100vw"
                            priority={index === 0}
                            className={`object-cover transition-opacity duration-1000 ${isStarted ? "opacity-60" : "opacity-0"}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
                        <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color" />
                    </div>
                );
            })}
        </div>
    );
}