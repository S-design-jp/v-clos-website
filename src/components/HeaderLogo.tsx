"use client";

import Link from "next/link";

export default function HeaderLogo() {
    return (
        <Link
            href="/"
            className="fixed top-8 left-8 z-[100] group cursor-pointer mix-blend-difference"
            aria-label="Back to Top"
        >
            <div className="flex flex-col leading-none">
                {/* メインロゴ */}
                <span className="font-jura font-bold text-xl tracking-widest text-white transition-colors duration-300 group-hover:text-cyan-400">
                    V-CLos
                </span>

                {/* サブテキスト（装飾） */}
                <span className="text-[8px] font-jura text-gray-400 tracking-[0.2em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    HOME
                </span>
            </div>
        </Link>
    );
}