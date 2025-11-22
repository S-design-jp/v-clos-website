"use client";

import Tilt from "react-parallax-tilt";
import TextScramble from "./TextScramble";

// 仮のデータ
const NEWS_ITEMS = [
    { date: "2025.11.20", title: "Project V-CLos 公式サイト公開", category: "INFO" },
    { date: "2025.12.05", title: "1st Live 'Re:Structure' チケット先行抽選開始", category: "EVENT" },
    { date: "2025.12.15", title: "公式グッズ 'Prism' シリーズ 第一弾ラインナップ", category: "GOODS" },
];

export default function NewsSection() {
    return (
        <section className="relative z-10 w-full px-6 py-32 max-w-6xl mx-auto">

            {/* セクションタイトル */}
            <div className="mb-16 flex items-end gap-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-jura mix-blend-difference">
                    NEWS
                </h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-400/50 to-transparent mb-4" />
            </div>

            {/* カードグリッド */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {NEWS_ITEMS.map((item, index) => (
                    <Tilt
                        key={index}
                        tiltMaxAngleX={10} // 傾きの最大角度 (X軸)
                        tiltMaxAngleY={10} // 傾きの最大角度 (Y軸)
                        perspective={1000} // 奥行き感
                        scale={1.02}       // ホバー時の拡大率
                        transitionSpeed={1000} // アニメーション速度
                        className="h-full"
                    >
                        <div className="group relative h-full p-8 rounded-sm border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50 cursor-none flex flex-col justify-between">

                            {/* カード内の光の反射エフェクト */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div>
                                {/* 日付とカテゴリ */}
                                <div className="flex items-center justify-between mb-6 font-jura text-xs text-gray-400">
                                    <span className="tracking-widest">{item.date}</span>
                                    <span className="px-2 py-0.5 border border-white/20 text-[10px] group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
                                        {item.category}
                                    </span>
                                </div>

                                {/* タイトル */}
                                <h3 className="text-sm md:text-base leading-relaxed text-gray-200 group-hover:text-white transition-colors font-sans">
                                    {item.title}
                                </h3>
                            </div>

                            {/* 装飾: コーナーマーク */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 group-hover:border-cyan-400 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 group-hover:border-cyan-400 transition-colors" />
                        </div>
                    </Tilt>
                ))}
            </div>

            {/* MOREボタン */}
            <div className="mt-16 flex justify-center">
                <button className="group relative px-12 py-4 border border-white/20 overflow-hidden font-jura text-sm tracking-[0.2em] transition-all hover:border-cyan-400/50">
                    <span className="relative z-10 group-hover:text-black transition-colors">VIEW ALL</span>
                    <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
            </div>

        </section>
    );
}