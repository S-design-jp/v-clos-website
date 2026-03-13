"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const MENU_ITEMS = [
    { label: "TOP", href: "/" },
    { label: "NEWS", href: "/news" },
    { label: "LIVE / EVENT", href: "/events" },
    { label: "ABOUT US", href: "/about" },
    { label: "CONTACT", href: "/contact" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);

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
        <>
            <button
                onClick={toggleMenu}
                className="fixed top-0 right-8 z-[201] h-[8vh] w-12 flex flex-col items-center justify-center gap-1.5 group mix-blend-difference"
            >
                <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : "group-hover:-translate-y-1"}`} />
                <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : "group-hover:translate-y-1"}`} />
            </button>

            <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">

                <div
                    className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    onClick={() => setIsOpen(false)}
                />

                <div
                    className={`absolute top-0 right-0 h-full w-full md:w-[60%] bg-gradient-to-b from-[#4cd8ed]/50 via-[#4cd8ed]/20 to-black/60 backdrop-blur-sm transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0" : "translate-x-[100%]"}`}
                    style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
                />

                <div
                    className={`absolute top-0 right-0 h-full w-[90%] md:w-[55%] bg-black/60 backdrop-blur-xl border-l border-[#4cd8ed]/40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 ${isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-[100%] pointer-events-none"}`}
                    style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#4cd8ed] to-transparent opacity-80 shadow-[0_0_15px_rgba(76,216,237,0.5)]" />

                    <div className="relative h-full flex flex-col justify-center pl-[20%] md:pl-[15%] pr-10 gap-8">

                        {MENU_ITEMS.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`group relative block w-fit text-2xl md:text-5xl font-jura font-bold tracking-widest text-transparent stroke-text hover:text-white transition-all duration-500 transform ${isOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
                                style={{ transitionDelay: `${index * 50 + 200}ms` }}
                            >
                                <span className="relative z-10 block group-hover:translate-x-4 transition-transform duration-300">
                                    {item.label}
                                </span>
                                <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#4cd8ed] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(76,216,237,0.8)]" />
                            </a>
                        ))}

                        <div
                            className={`mt-12 pt-8 border-t border-white/10 flex flex-col gap-6 transition-all duration-500 delay-700 pb-[8vh] ${isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
                        >
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => switchLanguage('ja')}
                                    className={`text-sm font-jura tracking-widest transition-colors pb-1 ${locale === 'ja' ? 'text-white border-b border-[#4cd8ed]' : 'text-gray-500 hover:text-white border-b border-transparent'}`}
                                >
                                    JP
                                </button>
                                <span className="text-gray-600">/</span>
                                <button
                                    onClick={() => switchLanguage('en')}
                                    className={`text-sm font-jura tracking-widest transition-colors pb-1 ${locale === 'en' ? 'text-white border-b border-[#4cd8ed]' : 'text-gray-500 hover:text-white border-b border-transparent'}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div >

            <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
        .stroke-text:hover {
          -webkit-text-stroke: 0px transparent;
          text-shadow: 0 0 20px rgba(76, 216, 237, 0.5);
        }
      `}</style>
        </>
    );
}