"use client";

import { useState, useEffect, use } from "react";
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
import { useTranslations, useLocale } from 'next-intl';
import ScrollIndicator from "@/components/ScrollIndicator";
import { fetchTopData } from "@/app/actions";

type Props = {
  params: Promise<{ locale: string }>;
};

function HeroModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[301] flex items-center justify-center px-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full max-w-lg pointer-events-auto"
              initial={{ y: 32, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 24, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,rgba(0,255,255,0.03)_50%,transparent_51%)] bg-[size:100%_4px]" />
              </div>

              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400 z-10" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400 z-10" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400 z-10" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400 z-10" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center border border-white/20 hover:border-cyan-400 hover:text-cyan-400 text-gray-400 transition-all duration-200 font-jura text-sm group"
                aria-label="Close"
              >
                <span className="group-hover:rotate-90 transition-transform duration-300 inline-block">✕</span>
              </button>

              <div className="relative z-10 bg-black/90 border border-white/10 backdrop-blur-xl p-8 pt-6">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function WhoWeAreModal({ locale }: { locale: string }) {
  return (
    <div className="font-jura space-y-6">
      <div className="border-b border-white/10 pb-4">
        <span className="text-[10px] text-cyan-400 tracking-[0.3em] block mb-1">SYS_INFO // 01</span>
        <h2 className="text-2xl font-bold text-white tracking-tight">WHO WE ARE</h2>
      </div>

      <div className="space-y-4 font-noto text-sm text-gray-300 leading-loose">
        <p>
          <span className="text-white font-bold">V-CLos</span> は、洗足学園音楽大学の学生が主体となり、次世代のエンターテイメントを追求する<span className="text-cyan-400">3DCGライブ制作団体</span>です。
        </p>
        <p>
          音楽大学ならではの「生演奏の圧倒的な熱量」と、モーションキャプチャを駆使した「最先端の3DCG技術」とを融合させた、唯一無二のバーチャル体験を創造しています。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        {[
          { label: "TYPE", value: "Live Production" },
          { label: "BASE", value: "Senzoku Gakuen" },
          { label: "TECH", value: "Motion Capture + 3DCG" },
          { label: "STATUS", value: "ACTIVE" },
        ].map((item) => (
          <div key={item.label} className="border border-white/10 px-3 py-2 bg-white/5">
            <span className="text-[10px] text-cyan-400 tracking-widest block">{item.label}</span>
            <span className="text-xs text-white">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Link
          href={`/${locale === "en" ? "en/" : ""}about`}
          className="group relative inline-flex items-center gap-3 px-6 py-3 overflow-hidden font-jura text-xs tracking-widest text-cyan-400 border border-cyan-400/50 hover:text-black transition-all duration-300 w-full justify-center"
        >
          <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          <span className="relative z-10">LEARN MORE ABOUT V-CLos</span>
          <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}

function NextEventModalContent({ event, locale }: { event: Event; locale: string }) {
  const displayTitle = locale === "en" && event.title_en ? event.title_en : event.title;
  const displayVenue = locale === "en" && event.venue_en ? event.venue_en : event.venue;
  const displayDescription = locale === "en" && event.description_en ? event.description_en : event.description;

  const dateStr = new Date(event.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="font-jura space-y-6">
      <div className="border-b border-white/10 pb-4">
        <span className="text-[10px] text-cyan-400 tracking-[0.3em] block mb-1">NEXT EVENT // UPCOMING</span>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white tracking-tight">EVENT INFO</h2>
          {event.status && (
            <span className="text-[10px] font-jura px-2 py-0.5 border border-cyan-400 text-cyan-400 animate-pulse">
              {event.status}
            </span>
          )}
        </div>
      </div>

      {(event.thumbnail?.url || event.mainImage?.url) && (
        <div
          className="w-full aspect-video bg-cover bg-center border border-white/10 relative overflow-hidden"
          style={{ backgroundImage: `url(${event.thumbnail?.url || event.mainImage?.url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-3 right-3">
            {event.series && (
              <span className="text-[10px] font-jura text-cyan-300 tracking-wider">{event.series}</span>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="text-[10px] text-gray-500 tracking-widest w-16 shrink-0">DATE</span>
          <span className="text-white font-bold text-lg font-jura">{dateStr}</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-[10px] text-gray-500 tracking-widest w-16 shrink-0">TITLE</span>
          <span className="text-white text-sm font-noto leading-relaxed">{displayTitle}</span>
        </div>
        {displayVenue && (
          <div className="flex items-baseline gap-3">
            <span className="text-[10px] text-gray-500 tracking-widest w-16 shrink-0">VENUE</span>
            <span className="text-gray-300 text-sm font-noto">{displayVenue}</span>
          </div>
        )}
        {displayDescription && (
          <div className="flex items-start gap-3 pt-1">
            <span className="text-[10px] text-gray-500 tracking-widest w-16 shrink-0 mt-1">DESC</span>
            <p className="text-gray-400 text-xs font-noto leading-relaxed line-clamp-3">
              {displayDescription.replace(/<[^>]*>/g, "")}
            </p>
          </div>
        )}
      </div>

      <div className="pt-2 grid grid-cols-2 gap-3">
        <Link
          href={`/${locale}/events/${event.id}`}
          className="group relative inline-flex items-center gap-2 px-4 py-3 overflow-hidden font-jura text-xs tracking-widest text-cyan-400 border border-cyan-400/50 hover:text-black transition-all duration-300 justify-center"
        >
          <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          <span className="relative z-10">DETAIL PAGE</span>
          <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <Link
          href={`/${locale}/events`}
          className="group relative inline-flex items-center gap-2 px-4 py-3 overflow-hidden font-jura text-xs tracking-widest text-gray-400 border border-white/20 hover:text-white hover:border-white/40 transition-all duration-300 justify-center"
        >
          <span className="relative z-10">ALL EVENTS</span>
        </Link>
      </div>
    </div>
  );
}

export default function Home({ params }: Props) {
  const { locale } = use(params);
  const t = useTranslations('Hero');
  const { isStarted, progress, isLoaded } = useGlobalState();
  const [newsData, setNewsData] = useState<News[]>([]);
  const [eventData, setEventData] = useState<Event[]>([]);

  const [whoWeAreOpen, setWhoWeAreOpen] = useState(false);
  const [nextEventOpen, setNextEventOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTopData();
      setNewsData(data.news);
      setEventData(data.events);
    };
    loadData();
  }, []);

  const MAX_DASH = 3000;
  const currentDashOffset = isLoaded ? 0 : MAX_DASH - (MAX_DASH * (progress / 100));

  const upcomingEvent = eventData.find((e) => {
    if (e.status && (e.status === "THANK YOU" || e.status.includes("終了"))) return false;
    if (!e.date) return false;
    const diff = new Date(e.date).getTime() - Date.now();
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
  });

  return (
    <main className="relative w-full min-h-screen text-white cursor-none font-sans bg-transparent">

      <div
        className={`fixed inset-0 z-[60] bg-black pointer-events-none transition-opacity duration-1000 ${isStarted ? "opacity-0" : "opacity-100"}`}
      />

      <HeroModal isOpen={whoWeAreOpen} onClose={() => setWhoWeAreOpen(false)}>
        <WhoWeAreModal locale={locale} />
      </HeroModal>

      {upcomingEvent && (
        <HeroModal isOpen={nextEventOpen} onClose={() => setNextEventOpen(false)}>
          <NextEventModalContent event={upcomingEvent} locale={locale} />
        </HeroModal>
      )}

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

          <div
            className={`hidden md:flex flex-col gap-0 w-[220px] transition-all duration-1000 delay-700 pointer-events-auto ${isStarted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
          >
            <button
              onClick={() => setWhoWeAreOpen(true)}
              className="group w-full text-left"
              aria-label="Open WHO WE ARE popup"
            >
              <div className="flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/40 border-b-0 px-3 py-1.5 group-hover:bg-cyan-400/20 transition-colors duration-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors" />
                <span className="text-[10px] font-jura text-cyan-400 tracking-[0.3em]">WHO WE ARE</span>
                <span className="ml-auto text-[9px] font-jura text-cyan-400/50 group-hover:text-cyan-400/80 transition-colors tracking-wider">
                  [+]
                </span>
              </div>
              <div className="flex flex-col gap-4 bg-black/60 backdrop-blur-md border border-cyan-400/30 border-t-0 px-5 py-5 group-hover:border-cyan-400/60 group-hover:bg-black/80 transition-all duration-300">
                <p className="text-sm font-noto text-gray-200 leading-relaxed">
                  洗足学園音楽大学の学生による<br />
                  3DCGライブ制作団体
                </p>
                <div className="w-8 h-[1px] bg-cyan-400/40 group-hover:w-16 group-hover:bg-cyan-400/80 transition-all duration-300" />
                <p className="text-[11px] font-jura text-gray-400 tracking-widest leading-loose">
                  LIVE PERFORMANCE<br />× MOTION CAPTURE
                </p>
                <div className="overflow-hidden h-0 group-hover:h-5 transition-all duration-300">
                  <span className="text-[10px] font-jura text-cyan-400/70 tracking-[0.2em]">CLICK FOR DETAILS ↗</span>
                </div>
              </div>
            </button>
          </div>
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
                    fontFamily: "Jura, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  V-CLos
                </text>
              </svg>
            </div>

            <p className="mt-2 text-[10px] md:text-sm text-gray-400 tracking-widest uppercase font-jura h-6">
              <TextScramble text={t('subtitle')} duration={2500} delay={800} start={isStarted} />
            </p>
          </h1>
          <NextEventPanel
            events={eventData}
            isStarted={isStarted}
            onOpen={() => setNextEventOpen(true)}
          />

        </div>

        {isStarted && <ScrollIndicator />}
      </section>

      <NewsSection news={newsData} />
      <LiveSection events={eventData} />
      <AboutSection />
      <MediaSection />
    </main>
  );
}
type NextEventPanelProps = {
  events: Event[];
  isStarted: boolean;
  onOpen: () => void;
};

function NextEventPanel({ events, isStarted, onOpen }: NextEventPanelProps) {
  const locale = useLocale();

  const upcomingEvent = events.find((e) => {
    if (e.status && (e.status === "THANK YOU" || e.status.includes("終了"))) return false;
    if (!e.date) return false;
    const diff = new Date(e.date).getTime() - Date.now();
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
  });

  if (!upcomingEvent) {
    return <div className="hidden md:block w-[200px]" />;
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
      className={`hidden md:flex flex-col gap-0 w-[220px] transition-all duration-1000 delay-700 pointer-events-auto ${isStarted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
    >
      <button
        onClick={onOpen}
        className="group w-full text-left"
        aria-label="Open NEXT EVENT popup"
      >
        <div className="flex items-center justify-end gap-2 bg-cyan-400/10 border border-cyan-400/40 border-b-0 px-3 py-1.5 group-hover:bg-cyan-400/20 transition-colors duration-200">
          <span className="mr-auto text-[9px] font-jura text-cyan-400/50 group-hover:text-cyan-400/80 transition-colors tracking-wider">
            [+]
          </span>
          <span className="text-[10px] font-jura text-cyan-400 tracking-[0.3em]">NEXT EVENT</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse group-hover:bg-cyan-400 transition-colors" />
        </div>
        <div className="flex flex-col gap-3 bg-black/60 backdrop-blur-md border border-cyan-400/30 border-t-0 px-5 py-5 items-end group-hover:border-cyan-400/60 group-hover:bg-black/80 transition-all duration-300">
          <p className="text-[11px] font-jura text-gray-500 tracking-widest text-right">
            {dateStr}
          </p>
          <p className="text-sm font-noto text-gray-200 leading-relaxed text-right line-clamp-2">
            {displayTitle}
          </p>
          {displayVenue && (
            <p className="text-[11px] font-jura text-gray-500 tracking-widest text-right">
              {displayVenue}
            </p>
          )}
          {upcomingEvent.status && (
            <span className="text-[10px] font-jura px-2 py-0.5 border border-cyan-400 text-cyan-400 animate-pulse mt-1">
              {upcomingEvent.status}
            </span>
          )}
          <div className="overflow-hidden h-0 group-hover:h-5 transition-all duration-300 text-right">
            <span className="text-[10px] font-jura text-cyan-400/70 tracking-[0.2em]">CLICK FOR DETAILS ↗</span>
          </div>
        </div>
      </button>
    </div>
  );
}