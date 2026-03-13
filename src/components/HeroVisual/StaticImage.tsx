"use client";

interface Props {
    imageSrc: string;
}

export default function StaticImage({ imageSrc }: Props) {
    return (
        <div className="absolute inset-0 z-0">
            <img
                src={imageSrc}
                alt=""
                className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        </div>
    );
}