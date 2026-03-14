"use client";

import Image from "next/image";

interface Props {
    imageSrc: string;
}
export default function StaticImage({ imageSrc }: Props) {
    return (
        <div className="absolute inset-0 z-0">
            <Image
                src={imageSrc}
                alt=""
                fill
                sizes="100vw"
                priority
                className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        </div>
    );
}