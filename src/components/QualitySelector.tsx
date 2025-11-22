"use client";

import TextScramble from "./TextScramble";

interface Props {
    onSelect: (mode: "high" | "mid" | "low") => void;
}

export default function QualitySelector({ onSelect }: Props) {
    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">

            <div className="mb-12 text-center space-y-2">
                <h2 className="text-2xl md:text-4xl font-jura font-bold text-white tracking-widest">
                    <TextScramble text="SYSTEM READY" duration={800} />
                </h2>
                <p className="text-xs md:text-sm font-jura text-cyan-400 tracking-[0.5em] animate-pulse">
                    SELECT PERFORMANCE MODE
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                {/* HIGH MODE */}
                <button
                    onClick={() => onSelect("high")}
                    className="group relative w-64 p-6 border border-white/20 hover:border-cyan-400 transition-colors text-left"
                >
                    <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-xl font-jura font-bold text-white mb-2 group-hover:text-cyan-400">HIGH</h3>
                    <p className="text-xs font-noto text-gray-400">
                        最高画質 / 屈折あり<br />
                        High-End PC Recommended
                    </p>
                    {/* 装飾 */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/50 group-hover:border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/50 group-hover:border-cyan-400" />
                </button>

                {/* MID MODE */}
                <button
                    onClick={() => onSelect("mid")}
                    className="group relative w-64 p-6 border border-white/20 hover:border-cyan-400 transition-colors text-left"
                >
                    <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-xl font-jura font-bold text-white mb-2 group-hover:text-cyan-400">MID</h3>
                    <p className="text-xs font-noto text-gray-400">
                        標準画質 / 屈折あり<br />
                        PC / 最新スマホ (Recommended)
                    </p>
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/50 group-hover:border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/50 group-hover:border-cyan-400" />
                </button>

                {/* LOW MODE */}
                <button
                    onClick={() => onSelect("low")}
                    className="group relative w-64 p-6 border border-white/20 hover:border-cyan-400 transition-colors text-left"
                >
                    <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-xl font-jura font-bold text-white mb-2 group-hover:text-cyan-400">LOW</h3>
                    <p className="text-xs font-noto text-gray-400">
                        軽量画質 / 屈折なし<br />
                        スマホ / 省電力モード
                    </p>
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/50 group-hover:border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/50 group-hover:border-cyan-400" />
                </button>
            </div>

        </div>
    );
}