"use client";

import { useEffect, useRef, useState } from "react";
import TextScramble from "./TextScramble";
import Link from "next/link";

const BLOCKS = [
    {
        title: "WHO WE ARE",
        text: [
            "V-CLosは、洗足学園音楽大学の学生が主体となり、",
            "次世代のエンターテイメントを追求する",
            "3DCGライブ制作団体です。"
        ]
    },
    {
        title: "OUR STRENGTH",
        text: [
            "私たちの最大の強みは、",
            "音楽大学ならではの「生演奏の力」と、",
            "学内のモーションキャプチャを駆使した",
            "「3DCG技術の実践」の融合です。"
        ]
    },
    {
        title: "OUR MISSION",
        text: [
            "企画、演奏、映像、",
            "そしてダンスモーションに至るまで、",
            "そのすべてを学生の手で創造する。",
            " ",
            "「VOCA-Fes Series」をはじめ、",
            "私たちにしかできないファンメイドライブの形を、",
            "ここから発信します。"
        ]
    }
];

export default function AboutSection() {
    const [visibleBlocks, setVisibleBlocks] = useState<number[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const windowHeight = window.innerHeight;
            const blocks = sectionRef.current.querySelectorAll('.about-block');

            blocks.forEach((block, index) => {
                const rect = block.getBoundingClientRect();
                // 画面の下から20%の位置に入ったら表示
                if (rect.top < windowHeight * 0.8) {
                    setVisibleBlocks(prev => prev.includes(index) ? prev : [...prev, index]);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        // 修正: NEWS/LIVEと同じ max-w-6xl mx-auto を適用し、横幅を統一
        <section ref={sectionRef} className="relative z-10 w-full px-6 py-32 max-w-6xl mx-auto min-h-screen">

            {/* タイトルエリア: NEWSと同じデザイン・配置 */}
            <div className="mb-20 flex items-end gap-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-jura mix-blend-difference">
                    ABOUT US
                </h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-400/50 to-transparent mb-4" />
            </div>

            {/* 本文エリア: ここだけ max-w-4xl で中央に寄せて読みやすくする */}
            <div className="max-w-4xl mx-auto space-y-24">
                {BLOCKS.map((block, index) => {
                    const isVisible = visibleBlocks.includes(index);

                    return (
                        <div
                            key={index}
                            className={`about-block flex gap-6 md:gap-10 transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                        >
                            {/* 左側の装飾ライン */}
                            <div className="relative flex-shrink-0 flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full border border-cyan-400 bg-black z-10 transition-all delay-300 duration-500 ${isVisible ? "bg-cyan-400 shadow-[0_0_10px_#00FFFF]" : ""}`} />
                                <div className={`w-[1px] flex-grow bg-gradient-to-b from-cyan-400/50 to-transparent transition-all duration-1000 ${isVisible ? "h-full" : "h-0"}`} />
                            </div>

                            {/* テキスト部分 */}
                            <div className="pb-10">
                                <h3 className="text-sm font-jura text-cyan-400/60 tracking-widest mb-4">
                                    {block.title}
                                </h3>

                                <div className="font-noto text-lg md:text-2xl font-medium leading-loose tracking-wide text-gray-200">
                                    {block.text.map((line, i) => (
                                        <p key={i} className={line === " " ? "h-6" : ""}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Moreボタン */}
            <div className="mt-20 flex justify-center">
                <Link
                    href="/about"
                    className="group relative inline-block px-12 py-4 border border-white/20 rounded-full overflow-hidden transition-all hover:border-cyan-400/50"
                >
                    <span className="relative z-10 text-sm font-jura tracking-[0.3em] group-hover:text-black transition-colors">
                        READ MORE
                    </span>
                    <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                </Link>
            </div>

        </section>
    );
}