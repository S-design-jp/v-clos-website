"use client";

import { useState } from "react";
import TextScramble from "./TextScramble";

const MENU_ITEMS = [
    { label: "TOP", href: "#" },
    { label: "NEWS", href: "#" },
    { label: "LIVE / EVENT", href: "#" },
    { label: "ABOUT US", href: "#" },
    { label: "CONTACT", href: "#" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* === ハンバーガーボタン (右上固定) === */}
            <button
                onClick={toggleMenu}
                className="fixed top-8 right-8 z-[100] w-12 h-12 flex flex-col items-center justify-center gap-1.5 group mix-blend-difference"
            >
                <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : "group-hover:-translate-y-1"}`} />
                <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : "group-hover:translate-y-1"}`} />
            </button>

            {/* === メニューコンテナ (画面全体を覆わず、右側に配置) === */}
            <div className={`fixed inset-0 z-[90] pointer-events-none overflow-hidden`}>

                {/* 1. 背景の暗転 (少しだけ暗くして文字を見やすく) */}
                <div
                    className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    onClick={() => setIsOpen(false)} // 背景クリックで閉じる
                />

                {/* 2. 装飾用の破片 (後ろにある紫色のガラス片) */}
                <div
                    className={`absolute top-0 right-0 h-full w-full md:w-[60%] bg-gradient-to-b from-purple-900/40 to-black/40 backdrop-blur-sm transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0" : "translate-x-[100%]"
                        }`}
                    style={{
                        // 鋭角な切り込みを入れる
                        clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)"
                    }}
                />

                {/* 3. メインのメニュー破片 (手前のシアン色のガラス片) */}
                <div
                    className={`absolute top-0 right-0 h-full w-[90%] md:w-[55%] bg-black/60 backdrop-blur-xl border-l border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 ${isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-[100%] pointer-events-none"
                        }`}
                    style={{
                        // 左上を鋭く切り落として「破片感」を出す
                        clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)"
                    }}
                >
                    {/* 破片の中のグリッド装飾 */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

                    {/* メニューの左端に光るライン */}
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50" />

                    {/* メニューリスト */}
                    <div className="relative h-full flex flex-col justify-center pl-[20%] md:pl-[15%] pr-10 gap-8">
                        {MENU_ITEMS.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`group relative block w-fit text-2xl md:text-5xl font-jura font-bold tracking-widest text-transparent stroke-text hover:text-white transition-all duration-500 transform ${isOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                            >
                                <span className="relative z-10 block group-hover:translate-x-4 transition-transform duration-300">
                                    <TextScramble text={item.label} duration={800} delay={index * 100 + 400} start={isOpen} />
                                </span>

                                {/* ホバー時の装飾ライン */}
                                <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}

                        {/* 言語切り替え */}
                        <div
                            className={`mt-8 flex items-center gap-6 transition-all duration-500 delay-700 ${isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                                }`}
                        >
                            <button className="text-sm font-jura tracking-widest text-cyan-400 border-b border-cyan-400 pb-1">JP</button>
                            <span className="text-gray-600">/</span>
                            <button className="text-sm font-jura tracking-widest text-gray-500 hover:text-white transition-colors pb-1">EN</button>
                        </div>
                    </div>
                </div>

            </div>

            <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
        .stroke-text:hover {
          -webkit-text-stroke: 0px transparent;
        }
      `}</style>
        </>
    );
}