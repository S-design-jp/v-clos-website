"use client";

import { useState, useEffect, use } from "react";
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

export default function Home({ params }: Props) {
  const { locale } = use(params);
  const t = useTranslations('Hero');
  const { isStarted, progress, isLoaded } = useGlobalState();
  const [newsData, setNewsData] = useState<News[]>([]);
  const [eventData, setEventData] = useState<Event[]>([]);

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

  return (
    <main className="relative w-full min-h-screen text-white cursor-none font-sans bg-transparent">

      {/* ローディング暗転 */}
      <div
        className={`fixed inset-0 z-[60] bg-black pointer-events-none transition-opacity duration-1000 ${isStarted ? "opacity-0" : "opacity-100"
          }`}
      />

      {/* ヒーローセクション */}
      <section className="relative z-20 w-full h-screen flex flex-col justify-center items-center pointer-events-none overflow-hidden">

        {/* パララックス背景 */}
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

        {/* 3カラムレイアウト */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-8 flex flex-row items-center justify-between">

          {/* 左: V-CLos説明 */}
          <div className={`hidden md:flex flex-col gap-0 w-[220px] transition-all duration-1000 delay-700 ${isStarted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}>
            {/* タイトルバー */}
            <div className="flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/40 border-b-0 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400/60" />
              <span className="text-[10px] font-jura text-cyan-400 tracking-[0.3em]">WHO WE ARE</span>
            </div>
            {/* 本体パネル */}
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

          {/* 中央: ロゴ */}
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

          {/* 右: 次回イベント（条件付き表示） */}
          <NextEventPanel events={eventData} isStarted={isStarted} />

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

// ─────────────────────────────────────────────────────────────
// NextEventPanel: 「30日以内・未終了」のイベントのみ表示
// ─────────────────────────────────────────────────────────────

type NextEventPanelProps = {
  events: Event[];
  isStarted: boolean;
};

function NextEventPanel({ events, isStarted }: NextEventPanelProps) {
  const locale = useLocale();

  const upcomingEvent = events.find((e) => {
    // 終了済みは除外
    if (e.status && (e.status === "THANK YOU" || e.status.includes("終了"))) return false;
    // 日付未設定は除外
    if (!e.date) return false;
    // 30日以内かつ未来のイベントのみ
    const diff = new Date(e.date).getTime() - Date.now();
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
  });

  // 対象なし → 不可視スペーサー（左右バランス維持）
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
    <div className={`hidden md:flex flex-col gap-0 w-[220px] transition-all duration-1000 delay-700 ${isStarted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
      }`}>
      {/* タイトルバー */}
      <div className="flex items-center justify-end gap-2 bg-cyan-400/10 border border-cyan-400/40 border-b-0 px-3 py-1.5">
        <span className="text-[10px] font-jura text-cyan-400 tracking-[0.3em]">NEXT EVENT</span>
        <span className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
      </div>
      {/* 本体パネル */}
      <div className="flex flex-col gap-3 bg-black/60 backdrop-blur-md border border-cyan-400/30 px-5 py-5 items-end">
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
      </div>
    </div>
  );
}