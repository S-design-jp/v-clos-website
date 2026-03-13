"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeaderLogo() {
    return (
        <Link
            href="/"
            className="fixed top-0 left-8 z-[201] group cursor-pointer mix-blend-difference"
            style={{ height: "8vh", display: "flex", alignItems: "center" }}
            aria-label="Back to Top"
        >
            <div className="flex flex-col leading-none">
                <div className="relative w-32 h-auto transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="V-CLos"
                        width={128}
                        height={40}
                        priority
                        className="object-contain w-full h-auto"
                    />
                </div>
                <span className="mt-1 text-[8px] font-jura text-gray-400 tracking-[0.2em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    HOME
                </span>
            </div>
        </Link>
    );
}