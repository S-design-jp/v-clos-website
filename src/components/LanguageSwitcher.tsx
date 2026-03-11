"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === 'ja' ? 'en' : 'ja';
        let newPath = pathname;

        if (nextLocale === 'en') {
            newPath = `/en${pathname === '/' ? '' : pathname}`;
        } else {
            newPath = pathname.replace(/^\/en/, '') || '/';
        }

        router.push(newPath);
    };

    return (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3">
            <span className="text-[10px] font-jura text-cyan-400/70 tracking-[0.3em]">
                SYS_LANG //
            </span>
            <button
                onClick={toggleLanguage}
                className="relative group overflow-hidden border border-white/20 bg-black/50 backdrop-blur-sm px-3 py-1 transition-all hover:border-cyan-400/50"
            >
                <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative text-xs font-jura font-bold tracking-widest text-white mix-blend-difference">
                    {locale === 'ja' ? 'JP' : 'EN'}
                </span>
            </button>
        </div>
    );
}