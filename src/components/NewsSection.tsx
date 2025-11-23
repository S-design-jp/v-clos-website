"use client";

import Tilt from "react-parallax-tilt";
import Link from "next/link"; // Linkをインポート
import type { News } from "@/libs/microcms";

interface Props {
    news: News[];
}

export default function NewsSection({ news }: Props) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };

    const displayNews = news && news.length > 0 ? news : [
        { id: "1", publishedAt: new Date().toISOString(), title: "公式サイト公開", summary: "V-CLosの公式サイトがオープンしました。", body: "" }
    ];

    return (
        <section className="relative z-10 w-full px-6 py-32 max-w-6xl mx-auto">

            <div className="mb-16 flex items-end gap-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-jura mix-blend-difference">NEWS</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-400/50 to-transparent mb-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayNews.map((item) => (
                    <Tilt key={item.id} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={1000} className="h-full">
                        {/* 修正: divをLinkに変更し、詳細ページへのパスを指定 */}
                        <Link href={`/news/${item.id}`} className="group relative block h-full p-8 rounded-sm border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50 cursor-none flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div>
                                <div className="flex items-center justify-between mb-6 font-jura text-xs text-gray-400">
                                    <span className="tracking-widest">{formatDate(item.publishedAt)}</span>
                                    {/* summaryからカテゴリを推測表示するか、固定にするか。一旦装飾として残す */}
                                    <span className="px-2 py-0.5 border border-white/20 text-[10px] group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
                                        INFO
                                    </span>
                                </div>

                                <h3 className="text-base md:text-lg font-bold leading-relaxed text-white mb-3 group-hover:text-cyan-400 transition-colors font-noto">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-gray-400 leading-loose font-noto line-clamp-3">
                                    {item.summary}
                                </p>
                            </div>

                            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 group-hover:border-cyan-400 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 group-hover:border-cyan-400 transition-colors" />
                        </Link>
                    </Tilt>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                {/* 修正: buttonをLinkに変更し、一覧ページへのパスを指定 */}
                <Link href="/news" className="group relative inline-block px-12 py-4 border border-white/20 overflow-hidden font-jura text-sm tracking-[0.2em] transition-all hover:border-cyan-400/50">
                    <span className="relative z-10 group-hover:text-black transition-colors">VIEW ALL</span>
                    <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
            </div>

        </section>
    );
}