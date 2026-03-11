"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { useTranslations } from 'next-intl';

const THEME_COLORS = {
    cyan: {
        text: "text-cyan-400",
        border: "border-cyan-400",
        borderNav: "border-cyan-400",
        bgNavActive: "bg-cyan-900/20",
        bgGlow: "bg-cyan-400/5",
        bgGlitch: "bg-cyan-400/20",
        buttonBorder: "border-cyan-400/50",
        buttonHoverBg: "hover:bg-cyan-400",
        decoBorder: "border-cyan-500/50",
    },
    yellow: {
        text: "text-yellow-400",
        border: "border-yellow-400",
        borderNav: "border-yellow-400",
        bgNavActive: "bg-yellow-900/20",
        bgGlow: "bg-yellow-400/5",
        bgGlitch: "bg-yellow-400/20",
        buttonBorder: "border-yellow-400/50",
        buttonHoverBg: "hover:bg-yellow-400",
        decoBorder: "border-yellow-500/50",
    },
    pink: {
        text: "text-pink-400",
        border: "border-pink-400",
        borderNav: "border-pink-400",
        bgNavActive: "bg-pink-900/20",
        bgGlow: "bg-pink-400/5",
        bgGlitch: "bg-pink-400/20",
        buttonBorder: "border-pink-400/50",
        buttonHoverBg: "hover:bg-pink-400",
        decoBorder: "border-pink-500/50",
    },
} as const;

type ThemeKey = keyof typeof THEME_COLORS;

const ITEMS_CONFIG: { id: string; theme: ThemeKey; hasButton?: boolean }[] = [
    { id: "01", theme: "cyan" },
    { id: "02", theme: "yellow" },
    { id: "03", theme: "pink", hasButton: true },
];

const GlitchText = ({ children, glitchBg }: { children: ReactNode; glitchBg: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20, skewX: 20 }}
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            exit={{ opacity: 0, x: 20, skewX: -20 }}
            transition={{ duration: 0.2, ease: "circOut" }}
            className="relative"
        >
            {children}
            <motion.div
                className={`absolute inset-0 ${glitchBg} mix-blend-screen`}
                initial={{ opacity: 0, x: 0 }}
                animate={{
                    opacity: [0, 1, 0, 1, 0],
                    x: [-5, 5, -2, 2, 0],
                    skewX: [0, 20, -20, 10, 0]
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

export default function AboutSection() {
    const t = useTranslations('About');
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isBooted, setIsBooted] = useState(false);

    const activeTheme = THEME_COLORS[ITEMS_CONFIG[activeIndex].theme];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const bootOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const bootScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5]);
    const bootFilter = useTransform(scrollYProgress, [0, 0.15, 0.2], ["blur(0px)", "blur(0px)", "blur(10px)"]);

    const uiOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
    const uiScale = useTransform(scrollYProgress, [0.15, 0.25], [0.95, 1]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.2) {
            setIsBooted(false);
        } else {
            setIsBooted(true);
            if (latest < 0.45) setActiveIndex(0);
            else if (latest < 0.7) setActiveIndex(1);
            else setActiveIndex(2);
        }
    });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none transition-colors duration-500">
                    <div className={`absolute left-10 top-10 w-32 h-32 border-l border-t ${activeTheme.decoBorder} transition-colors duration-500`} />
                    <div className={`absolute right-10 bottom-10 w-32 h-32 border-r border-b ${activeTheme.decoBorder} transition-colors duration-500`} />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                </div>

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none bg-black"
                    style={{ opacity: bootOpacity, scale: bootScale, filter: bootFilter }}
                >
                    <div className="relative">
                        <h2 className="text-6xl md:text-9xl font-bold font-jura text-white tracking-tighter mb-4">
                            ABOUT<span className="text-cyan-400">_</span>US
                        </h2>
                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                                style={{ width: useTransform(scrollYProgress, [0, 0.15], ["0%", "100%"]) }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-jura text-cyan-500">
                            <span>SYSTEM INITIALIZING...</span>
                            <span>V-CLOS v2.0.26</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 h-[60vh] items-center"
                    style={{ opacity: uiOpacity, scale: uiScale } as any}
                >

                    <div className="col-span-1 md:col-span-4 flex flex-col justify-center border-l-2 border-white/10 pl-6 space-y-2">
                        <div className="text-xs font-jura text-gray-500 mb-4 tracking-widest">SYSTEM_NAV //</div>
                        {ITEMS_CONFIG.map((item, index) => {
                            const itemTheme = THEME_COLORS[item.theme];
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={item.id}
                                    className={`relative cursor-pointer transition-all duration-300 group py-3 px-4 ${isActive
                                        ? `${itemTheme.bgNavActive} border-l-4 ${itemTheme.borderNav}`
                                        : "border-l-4 border-transparent hover:bg-white/5"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`font-jura text-lg tracking-widest transition-colors duration-300 ${isActive ? `${itemTheme.text} font-bold` : "text-gray-500 group-hover:text-gray-300"
                                            }`}>
                                            {t(`items.${item.id}.tab`)}
                                        </span>
                                        <span className={`text-xs font-jura transition-colors duration-300 ${isActive ? itemTheme.text : "text-gray-600"
                                            }`}>
                                            {item.id}
                                        </span>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeGlow"
                                            className={`absolute inset-0 ${itemTheme.bgGlow} -z-10`}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="col-span-1 md:col-span-8 relative h-full flex flex-col justify-center">
                        <div className={`absolute top-0 right-0 font-jura text-xs ${activeTheme.text} tracking-widest opacity-50 transition-colors duration-500`}>
                            STATUS: {isBooted ? "ONLINE" : "BOOTING"} <br />
                            ID: {ITEMS_CONFIG[activeIndex].id}
                        </div>

                        <AnimatePresence mode="wait">
                            {isBooted && (
                                <motion.div
                                    key={activeIndex}
                                    className="relative p-6 md:p-12 border border-white/10 bg-black/50 backdrop-blur-sm"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-2 bg-white" />
                                    <div className="absolute top-0 right-0 w-2 h-2 bg-white" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-white" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-white" />

                                    <GlitchText glitchBg={activeTheme.bgGlitch}>
                                        <span className={`block ${activeTheme.text} font-jura tracking-[0.3em] mb-4 text-sm transition-colors duration-300`}>
                                            /// {t(`items.${ITEMS_CONFIG[activeIndex].id}.tab`)}
                                        </span>
                                        <h2 className="text-4xl md:text-7xl font-bold font-jura text-white mb-8 leading-tight">
                                            {t(`items.${ITEMS_CONFIG[activeIndex].id}.title`)}
                                        </h2>
                                        <p className="text-base md:text-xl font-noto text-gray-300 leading-relaxed max-w-2xl whitespace-pre-wrap">
                                            {t(`items.${ITEMS_CONFIG[activeIndex].id}.desc`)}
                                        </p>

                                        {ITEMS_CONFIG[activeIndex].hasButton && (
                                            <div className="mt-10">
                                                <Link href="/about" className={`group relative inline-flex items-center gap-3 px-6 py-3 overflow-hidden font-jura text-sm tracking-widest ${activeTheme.text} border ${activeTheme.buttonBorder} ${activeTheme.buttonHoverBg} hover:text-black transition-all duration-300`}>
                                                    <span className="relative z-10">READ MORE</span>
                                                    <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform">→</span>
                                                    <div className={`absolute inset-0 ${activeTheme.text.replace('text', 'bg')} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
                                                </Link>
                                            </div>
                                        )}
                                    </GlitchText>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </motion.div>

            </div>
        </section>
    );
}