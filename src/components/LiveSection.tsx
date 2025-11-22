"use client";

import Tilt from "react-parallax-tilt";
import TextScramble from "./TextScramble";

const LIVE_ITEMS = [
    {
        date: "2025.12.24",
        title: "V-CLos 1st Live 'Re:Structure'",
        place: "KT Zepp Yokohama",
        status: "TICKET NOW",
        imageColor: "from-cyan-500/20 to-blue-600/20"
    },
    {
        date: "2026.02.10",
        title: "Experimental Show 'Glitch_Box'",
        place: "Spotify O-EAST",
        status: "COMING SOON",
        imageColor: "from-purple-500/20 to-pink-600/20"
    }
];

export default function LiveSection() {
    return (
        <section className="relative z-10 w-full px-6 py-32 max-w-6xl mx-auto">

            <div className="mb-16 flex items-end justify-end gap-4">
                <div className="h-[1px] flex-grow bg-gradient-to-l from-cyan-400/50 to-transparent mb-4" />
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-jura mix-blend-difference text-right">
                    LIVE / EVENT
                </h2>
            </div>

            <div className="space-y-12">
                {LIVE_ITEMS.map((item, index) => (
                    <Tilt
                        key={index}
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        perspective={1000}
                        scale={1.01}
                        transitionSpeed={1000}
                        className="w-full"
                    >
                        <div className="group relative w-full overflow-hidden rounded-sm border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-cyan-400/50 cursor-none">

                            <div className={`absolute inset-0 bg-gradient-to-r ${item.imageColor} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 mix-blend-overlay" />

                            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center justify-between">
                                <div className="flex flex-col gap-2 min-w-[140px]">
                                    <span className="font-jura text-2xl md:text-3xl text-white tracking-widest">
                                        {item.date}
                                    </span>
                                    <span className={`inline-block px-3 py-1 text-[10px] font-jura tracking-widest border w-fit ${item.status === "TICKET NOW"
                                        ? "border-cyan-400 text-cyan-400 animate-pulse"
                                        : "border-gray-500 text-gray-500"
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>

                                <div className="flex-grow border-l border-white/10 md:pl-8 pl-4 ml-2 md:ml-0">
                                    <h3 className="font-jura text-xl md:text-3xl font-bold text-gray-100 mb-2 group-hover:text-cyan-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="font-noto text-sm text-gray-400 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                                        {item.place}
                                    </p>
                                </div>

                                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-white/20 group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-all duration-300">
                                    <svg className="w-6 h-6 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Tilt>
                ))}
            </div>

            {/* 修正箇所: ボタンデザインを強化 */}
            <div className="mt-16 flex justify-end">
                <button className="group relative px-10 py-4 border border-white/20 overflow-hidden font-jura text-sm tracking-[0.2em] transition-all hover:border-cyan-400/50 hover:pr-16">
                    <span className="relative z-10 group-hover:text-black transition-colors">VIEW ALL SCHEDULE</span>

                    {/* 背景アニメーション（右から左へ埋まる） */}
                    <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300" />

                    {/* ホバーで出現する矢印 */}
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-20 text-black transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        →
                    </span>
                </button>
            </div>

        </section>
    );
}