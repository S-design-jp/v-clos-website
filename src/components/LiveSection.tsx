"use client";

import Tilt from "react-parallax-tilt";
import Link from "next/link"; // Linkをインポート
import type { Event } from "@/libs/microcms";

interface Props {
    events: Event[];
}

export default function LiveSection({ events }: Props) {
    const formatDate = (dateString: string) => {
        if (!dateString) return "TBA";
        const date = new Date(dateString);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };

    const displayEvents = events && events.length > 0 ? events : [
        { id: "1", publishedAt: "", date: "2025-12-24T18:00:00Z", title: "Sample Event", venue: "Tokyo", status: "TICKET NOW" }
    ];

    return (
        <section className="relative z-10 w-full px-6 py-32 max-w-6xl mx-auto">

            <div className="mb-16 flex items-end justify-end gap-4">
                <div className="h-[1px] flex-grow bg-gradient-to-l from-cyan-400/50 to-transparent mb-4" />
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-jura mix-blend-difference text-right">
                    LIVE / EVENT
                </h2>
            </div>

            <div className="space-y-12">
                {displayEvents.map((item) => (
                    <Tilt key={item.id} tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1000} className="w-full">
                        {/* 修正: Linkに変更 */}
                        <Link href={`/events/${item.id}`} className="group relative block w-full overflow-hidden rounded-sm border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-cyan-400/50 cursor-none">

                            {(item.thumbnail?.url || item.mainImage?.url) && (
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                                    style={{ backgroundImage: `url(${item.thumbnail?.url || item.mainImage?.url})` }}
                                />
                            )}

                            {!(item.thumbnail?.url || item.mainImage?.url) && (
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 opacity-30" />
                            )}

                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 mix-blend-overlay" />

                            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center justify-between z-10">

                                <div className="flex flex-col gap-3 min-w-[160px]">
                                    <span className="font-jura text-2xl md:text-3xl text-white tracking-widest drop-shadow-lg">
                                        {formatDate(item.date)}
                                    </span>
                                    {item.status && (
                                        <span className={`inline-block px-3 py-1 text-[10px] font-noto tracking-wider border w-fit ${item.status.includes("終了") ? "border-gray-500 text-gray-500" : "border-cyan-400 text-cyan-400 animate-pulse bg-black/50"
                                            }`}>
                                            {item.status}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-grow border-l border-white/30 md:pl-8 pl-4 ml-2 md:ml-0">
                                    {item.series && (
                                        <span className="block text-xs font-jura text-cyan-300 mb-1 tracking-wider">
                                            {item.series}
                                        </span>
                                    )}
                                    <h3 className="font-noto text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors drop-shadow-md">
                                        {item.title}
                                    </h3>
                                    {item.venue && (
                                        <p className="font-noto text-sm text-gray-300 flex items-center gap-2">
                                            <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                                            {item.venue}
                                        </p>
                                    )}
                                </div>

                                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-white/20 bg-black/20 group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-all duration-300">
                                    <svg className="w-6 h-6 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>

                            </div>
                        </Link>
                    </Tilt>
                ))}
            </div>

            <div className="mt-16 flex justify-end">
                {/* 修正: buttonをLinkに変更 */}
                <Link href="/events" className="group relative inline-block px-10 py-4 border border-white/20 overflow-hidden font-jura text-sm tracking-[0.2em] transition-all hover:border-cyan-400/50 hover:pr-16">
                    <span className="relative z-10 group-hover:text-black transition-colors">VIEW ALL SCHEDULE</span>
                    <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300" />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-20 text-black transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        →
                    </span>
                </Link>
            </div>

        </section>
    );
}