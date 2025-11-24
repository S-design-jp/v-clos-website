"use client";

import Link from "next/link";
import TextScramble from "@/components/TextScramble";

export default function NotFound() {
    return (
        <main className="relative w-full h-screen bg-black text-white flex flex-col items-center justify-center font-jura overflow-hidden">

            {/* 背景演出 (軽量版) */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 text-center space-y-8">
                {/* 巨大な404 */}
                <h1 className="text-[15vw] md:text-[10vw] font-bold leading-none tracking-tighter text-transparent stroke-text select-none opacity-50">
                    404
                </h1>

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-cyan-400 tracking-widest">
                        <TextScramble text="PAGE NOT FOUND" />
                    </h2>
                    <p className="text-gray-500 text-xs md:text-sm tracking-widest font-noto">
                        お探しのページは存在しないか、移動した可能性があります。<br />
                        (URLをご確認ください)
                    </p>
                </div>

                {/* 戻るボタン */}
                <div className="pt-8">
                    <Link
                        href="/"
                        className="group relative inline-block px-12 py-4 border border-white/20 overflow-hidden text-sm tracking-[0.2em] transition-all hover:border-cyan-400/50"
                    >
                        <span className="relative z-10 group-hover:text-black transition-colors">RETURN TO TOP</span>
                        <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </Link>
                </div>
            </div>

            {/* 縁取り文字用のスタイル */}
            <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </main>
    );
}