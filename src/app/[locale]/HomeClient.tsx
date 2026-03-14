"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import TextScramble from "@/components/TextScramble";
import NewsSection from "@/components/NewsSection";
import LiveSection from "@/components/LiveSection";
import AboutSection from "@/components/AboutSection";
import MediaSection from "@/components/MediaSection";
import HeroVisual from "@/components/HeroVisual";
import { useGlobalState } from "@/context/GlobalContext";
import type { News, Event } from "@/libs/microcms";
import { useTranslations } from "next-intl";
import ScrollIndicator from "@/components/ScrollIndicator";

interface Props {
    locale: string;
    news: News[];
    events: Event[];
}

const getPopupKey = (eventId: string) => `v-clos-event-popup-${eventId}`;

function EventAutoPopup({
    event,
    locale,
    onClose,
}: {
    event: Event;
    locale: string;
    onClose: () => void;
}) {
    const displayTitle = locale === "en" && event.title_en ? event.title_en : event.title;
    const displayVenue = locale === "en" && event.venue_en ? event.venue_en : event.venue;
    const displayDescription = locale === "en" && event.description_en ? event.description_en : event.description;

    const dateStr = new Date(event.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "auto"; };
    }, []);

    return (
        <>
            <motion.div
                className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={onClose}
            />

            <motion.div
                className="fixed inset-0 z-[301] flex items-center justify-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="relative w-full max-w-lg"
                    initial={{ y: 40, scale: 0.96 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 24, scale: 0.97, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,rgba(0,255,255,0.03)_50%,transparent_51%)] bg-[size:100%_4px]" />
                    </div>

                    <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-cyan-400 z-10" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-cyan-400 z-10" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-cyan-400 z-10" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-cyan-400 z-10" />

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center border border-white/20 hover:border-cyan-400 hover:text-cyan-400 text-gray-400 transition-all duration-200 font-jura text-sm group"
                        aria-label="Close"
                    >
                        <span className="group-hover:rotate-90 transition-transform duration-300 inline-block">✕</span>
                    </button>

                    <div className="relative z-10 bg-black/95 border border-white/10 backdrop-blur-xl">
                        {(event.thumbnail?.url || event.mainImage?.url) && (
                            <div
                                className="w-full aspect-video bg-cover bg-center relative overflow-hidden"
                                style={{ backgroundImage: `url(${event.thumbnail?.url || event.mainImage?.url})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                {event.status && (
                                    <div className="absolute bottom-3 left-4">
                                        <span className="text-[10px] font-jura px-2 py-0.5 border border-cyan-400 text-cyan-400 animate-pulse bg-black/60">
                                            {event.status}
                                        </span>
                                    </div>
                                )}
                                {event.series && (
                                    <div className="absolute top-3 left-4">
                                        <span className="text-[10px] font-jura text-cyan-300 tracking-wider bg-black/60 px-2 py-0.5">
                                            {event.series}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="p-6 space-y-5">
                            <div className="border-b border-white/10 pb-4">
                                <span className="text-[10px] text-cyan-400 tracking-[0.3em] block mb-2 font-jura">
                                    UPCOMING EVENT
                                </span>
                                <div className="flex items-start justify-between gap-3">
                                    <h2 className="text-xl md:text-2xl font-bold text-white font-noto leading-tight">
                                        {displayTitle}
                                    </h2>
                                    {!(event.thumbnail?.url || event.mainImage?.url) && event.status && (
                                        <span className="shrink-0 text-[10px] font-jura px-2 py-0.5 border border-cyan-400 text-cyan-400 animate-pulse">
                                            {event.status}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="border border-white/10 px-3 py-2 bg-white/5">
                                    <span className="text-[10px] text-cyan-400 tracking-widest block font-jura">DATE</span>
                                    <span className="text-sm text-white font-jura">{dateStr}</span>
                                </div>
                                {displayVenue && (
                                    <div className="border border-white/10 px-3 py-2 bg-white/5">
                                        <span className="text-[10px] text-cyan-400 tracking-widest block font-jura">VENUE</span>
                                        <span className="text-sm text-white font-noto">{displayVenue}</span>
                                    </div>
                                )}
                            </div>

                            {displayDescription && (
                                <p className="text-xs text-gray-400 font-noto leading-relaxed line-clamp-3">
                                    {displayDescription.replace(/<[^>]*>/g, "")}
                                </p>
                            )}

                            <div className="grid grid-cols-2 gap-3 pt-1">
                                <Link
                                    href={`/${locale}/events/${event.id}`}
                                    className="group relative inline-flex items-center gap-2 px-4 py-3 overflow-hidden font-jura text-xs tracking-widest text-cyan-400 border border-cyan-400/50 hover:text-black transition-all duration-300 justify-center"
                                >
                                    <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    <span className="relative z-10">DETAIL PAGE →</span>
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="inline-flex items-center justify-center px-4 py-3 font-jura text-xs tracking-widest text-gray-500 border border-white/10 hover:text-white hover:border-white/30 transition-all duration-300"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}

export default function HomeClient({ locale, news, events }: Props) {
    const t = useTranslations("Hero");
    const { isStarted, progress, isLoaded } = useGlobalState();
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupEvent, setPopupEvent] = useState<Event | null>(null);

    /*
     * ポップアップ判定
     * events は props から初期値として受け取るため、
     * 以前の useEffect([isStarted, eventData]) と同等に動作する
     */
    useEffect(() => {
        if (!isStarted || events.length === 0) return;

        const upcoming = events.find((e) => {
            if (e.status && (e.status === "THANK YOU" || e.status.includes("終了"))) return false;
            if (!e.date) return false;
            const diff = new Date(e.date).getTime() - Date.now();
            return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
        });

        if (!upcoming) return;

        const alreadySeen = sessionStorage.getItem(getPopupKey(upcoming.id));
        if (alreadySeen) return;

        const timer = setTimeout(() => {
            setPopupEvent(upcoming);
            setPopupOpen(true);
        }, 1200);

        return () => clearTimeout(timer);
    }, [isStarted, events]);

    const handlePopupClose = () => {
        setPopupOpen(false);
        if (popupEvent) {
            sessionStorage.setItem(getPopupKey(popupEvent.id), "true");
        }
    };

    const MAX_DASH = 3000;
    const currentDashOffset = isLoaded ? 0 : MAX_DASH - (MAX_DASH * (progress / 100));

    return (
        <main className="relative w-full min-h-screen text-white cursor-none font-sans bg-transparent">

            <div
                className={`fixed inset-0 z-[60] bg-black pointer-events-none transition-opacity duration-1000 ${isStarted ? "opacity-0" : "opacity-100"}`}
            />

            <AnimatePresence>
                {popupOpen && popupEvent && (
                    <EventAutoPopup
                        event={popupEvent}
                        locale={locale}
                        onClose={handlePopupClose}
                    />
                )}
            </AnimatePresence>

            <section className="relative z-20 w-full h-screen flex flex-col justify-center items-center pointer-events-none overflow-hidden">

                <div className="pointer-events-auto w-full h-full absolute inset-0">
                    <HeroVisual
                        images={[
                            "/images/live1.jpg",
                            "/images/live2.jpg",
                            "/images/live3.jpg",
                            "/images/live4.jpg",
                        ]}
                    />
                </div>

                <div className="relative z-20 w-full max-w-6xl mx-auto px-8 flex flex-row items-center justify-between">

                    <WhoWeArePanel isStarted={isStarted} />

                    <h1 className="flex flex-col items-center font-bold tracking-tighter mix-blend-difference font-jura">
                        <span className="block text-cyan-400 opacity-80 text-[10px] md:text-sm tracking-[0.5em] md:tracking-[1em] mb-2 md:mb-4 pl-2 h-6">
                            <TextScramble text="PROJECT" duration={800} delay={200} start={isStarted} />
                        </span>

                        <div className="relative w-[80vw] h-[50px] md:w-[500px] md:h-[140px]">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
                                <text
                                    x="50%"
                                    y="50%"
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    fontSize="72"
                                    strokeWidth="1.5"
                                    style={{
                                        stroke: isStarted ? "transparent" : "white",
                                        fill: isStarted ? "white" : "transparent",
                                        strokeDasharray: MAX_DASH,
                                        strokeDashoffset: currentDashOffset,
                                        transition: "fill 1s ease, stroke 1s ease",
                                        fontFamily: "futura-pt, 'Futura', Jura, sans-serif",
                                        fontWeight: "bold",
                                    }}
                                >
                                    V-CLos
                                </text>
                            </svg>
                        </div>

                        <p className="mt-2 text-[10px] md:text-sm text-gray-400 tracking-widest uppercase font-jura h-6">
                            <TextScramble text={t("subtitle")} duration={2500} delay={800} start={isStarted} />
                        </p>
                    </h1>

                    <NextEventPanel events={events} isStarted={isStarted} locale={locale} />

                </div>

                {isStarted && <ScrollIndicator />}
            </section>

            <NewsSection news={news} />
            <LiveSection events={events} />
            <AboutSection />
            <MediaSection />
        </main>
    );
}

function WhoWeArePanel({ isStarted }: { isStarted: boolean }) {
    return (
        <div
            className={`hidden md:flex flex-col gap-0 w-[220px] transition-all duration-1000 delay-700 ${isStarted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
        >
            <div className="flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/40 border-b-0 px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400/60" />
                <span className="text-[10px] font-jura text-cyan-400 tracking-[0.3em]">WHO WE ARE</span>
            </div>
            <div className="flex flex-col gap-4 bg-black/60 backdrop-blur-md border border-cyan-400/30 px-5 py-5">
                <p className="text-sm font-noto text-gray-200 leading-relaxed">
                    洗足学園音楽大学の学生による<br />
                    3DCGライブ制作団体
                </p>
                <div className="w-8 h-[1px] bg-cyan-400/40" />
                <p className="text-[11px] font-jura text-gray-400 tracking-widest leading-loose">
                    LIVE PERFORMANCE<br />× MOTION CAPTURE
                </p>
            </div>
        </div>
    );
}

function NextEventPanel({
    events,
    isStarted,
    locale,
}: {
    events: Event[];
    isStarted: boolean;
    locale: string;
}) {
    const upcomingEvent = events.find((e) => {
        if (e.status && (e.status === "THANK YOU" || e.status.includes("終了"))) return false;
        if (!e.date) return false;
        const diff = new Date(e.date).getTime() - Date.now();
        return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
    });

    if (!upcomingEvent) {
        return <div className="hidden md:block w-[220px]" />;
    }

    const displayTitle = locale === "en" && upcomingEvent.title_en
        ? upcomingEvent.title_en
        : upcomingEvent.title;

    const displayVenue = locale === "en" && upcomingEvent.venue_en
        ? upcomingEvent.venue_en
        : upcomingEvent.venue;

    const dateStr = new Date(upcomingEvent.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    return (
        <div
            className={`hidden md:flex flex-col gap-0 w-[220px] transition-all duration-1000 delay-700 ${isStarted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
        >
            <div className="flex items-center justify-end gap-2 bg-cyan-400/10 border border-cyan-400/40 border-b-0 px-3 py-1.5">
                <span className="text-[10px] font-jura text-cyan-400 tracking-[0.3em]">NEXT EVENT</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
            </div>
            <div className="flex flex-col gap-3 bg-black/60 backdrop-blur-md border border-cyan-400/30 px-5 py-5 items-end">
                <p className="text-[11px] font-jura text-gray-500 tracking-widest text-right">{dateStr}</p>
                <p className="text-sm font-noto text-gray-200 leading-relaxed text-right line-clamp-2">{displayTitle}</p>
                {displayVenue && (
                    <p className="text-[11px] font-jura text-gray-500 tracking-widest text-right">{displayVenue}</p>
                )}
                {upcomingEvent.status && (
                    <span className="text-[10px] font-jura px-2 py-0.5 border border-cyan-400 text-cyan-400 animate-pulse mt-1">
                        {upcomingEvent.status}
                    </span>
                )}
            </div>
        </div>
    );
}