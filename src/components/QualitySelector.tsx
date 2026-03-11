"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

interface Props {
    onSelect: (mode: "high" | "mid" | "low") => void;
}

export default function QualitySelector({ onSelect }: Props) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    // 言語切り替えロジック（Cookie上書き＋強制リフレッシュ）
    const switchLanguage = (newLocale: string) => {
        if (locale === newLocale) return;

        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

        let newPath = pathname;
        if (newLocale === 'en') {
            newPath = `/en${pathname === '/' ? '' : pathname}`;
        } else {
            newPath = pathname.replace(/^\/en/, '') || '/';
        }

        router.push(newPath);
        router.refresh();
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">

            <div className="flex flex-col items-center w-full max-w-4xl px-4 gap-10">

                {/* 1. SELECT PERFORMANCE MODE (タイトル) */}
                <div className="text-center">
                    <h2 className="text-xl md:text-2xl font-jura text-cyan-400 tracking-[0.5em] animate-pulse font-bold">
                        SELECT PERFORMANCE MODE
                    </h2>
                </div>

                {/* 2. 言語設定 */}
                <div className="flex flex-col items-center gap-4">
                    {/* ★ここを修正しました！ENの時は LANGUAGE になります */}
                    <span className="flex items-center gap-4 text-sm md:text-base font-bold text-white tracking-[0.2em]">
                        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cyan-400/80" />
                        {locale === 'en' ? 'LANGUAGE' : '言語設定'}
                        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-cyan-400/80" />
                    </span>

                    <div className="flex items-center gap-8 border border-white/30 bg-white/5 px-8 py-3 backdrop-blur-md rounded-sm">
                        <button
                            onClick={() => switchLanguage('ja')}
                            className={`relative text-base font-jura tracking-[0.2em] transition-all duration-300 ${locale === 'ja' ? 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {locale === 'ja' && <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />}
                            JP
                        </button>

                        <span className="w-[1px] h-5 bg-white/30 skew-x-[20deg]" />

                        <button
                            onClick={() => switchLanguage('en')}
                            className={`relative text-base font-jura tracking-[0.2em] transition-all duration-300 ${locale === 'en' ? 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {locale === 'en' && <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />}
                            EN
                        </button>
                    </div>
                </div>

                {/* 3. 画質設定 (HIGH / MID / LOW) */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full justify-center">
                    {/* HIGH MODE */}
                    <button
                        onClick={() => onSelect("high")}
                        className="group relative w-full md:w-64 p-6 border border-white/30 hover:border-cyan-400 transition-colors text-left bg-black/40"
                    >
                        <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-xl font-jura font-bold text-white mb-2 group-hover:text-cyan-400">HIGH</h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-noto">
                            {locale === 'en' ? "Best Quality / Refraction ON" : "最高画質 / 屈折あり"}<br />
                            High-End PC Recommended
                        </p>
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/50 group-hover:border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/50 group-hover:border-cyan-400" />
                    </button>

                    {/* MID MODE */}
                    <button
                        onClick={() => onSelect("mid")}
                        className="group relative w-full md:w-64 p-6 border border-white/30 hover:border-cyan-400 transition-colors text-left bg-black/40"
                    >
                        <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-xl font-jura font-bold text-white mb-2 group-hover:text-cyan-400">MID</h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-noto">
                            {locale === 'en' ? "Standard Quality / Refraction ON" : "標準画質 / 屈折あり"}<br />
                            {locale === 'en' ? "PC / Latest Smartphones" : "PC / 最新スマホ (Recommended)"}
                        </p>
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/50 group-hover:border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/50 group-hover:border-cyan-400" />
                    </button>

                    {/* LOW MODE */}
                    <button
                        onClick={() => onSelect("low")}
                        className="group relative w-full md:w-64 p-6 border border-white/30 hover:border-cyan-400 transition-colors text-left bg-black/40"
                    >
                        <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-xl font-jura font-bold text-white mb-2 group-hover:text-cyan-400">LOW</h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-noto">
                            {locale === 'en' ? "Performance / Refraction OFF" : "軽量画質 / 屈折なし"}<br />
                            {locale === 'en' ? "Smartphones / Battery Saver" : "スマホ / 省電力モード"}
                        </p>
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/50 group-hover:border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/50 group-hover:border-cyan-400" />
                    </button>
                </div>
            </div>

        </div>
    );
}