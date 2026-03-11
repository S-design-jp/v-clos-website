"use client";

import { useState, useEffect, use } from "react";
import TextScramble from "@/components/TextScramble";
import NewsSection from "@/components/NewsSection";
import LiveSection from "@/components/LiveSection";
import AboutSection from "@/components/AboutSection";
import MediaSection from "@/components/MediaSection";
import { useGlobalState } from "@/context/GlobalContext";
import type { News, Event } from "@/libs/microcms";
import { useTranslations } from 'next-intl';
import ScrollIndicator from "@/components/ScrollIndicator";
import { fetchTopData } from "@/app/actions"; // ★ 追加: Server Actionをインポート

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);

  const t = useTranslations('Hero');

  const { isStarted, progress, isLoaded, qualityMode } = useGlobalState();

  const [newsData, setNewsData] = useState<News[]>([]);
  const [eventData, setEventData] = useState<Event[]>([]);

  // ★ 修正: 不安定な fetch API をやめ、Server Action で直接データを取得
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

      {qualityMode && (
        <>
          <div
            className={`fixed inset-0 z-[60] bg-black pointer-events-none transition-opacity duration-1000 ${isStarted ? "opacity-0" : "opacity-100"
              }`}
          />

          <section className="relative z-50 w-full h-screen flex flex-col justify-center items-center pointer-events-none">
            <h1 className="relative flex flex-col items-center font-bold tracking-tighter mix-blend-difference font-jura">

              <span className="block text-cyan-400 opacity-80 text-[10px] md:text-sm tracking-[0.5em] md:tracking-[1em] mb-2 md:mb-4 pl-2 h-6">
                <TextScramble text="PROJECT" duration={800} delay={200} start={isStarted} />
              </span>

              <div className="relative w-[90vw] h-[60px] md:w-[600px] md:h-[160px]">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="font-jura font-bold text-6xl md:text-8xl"
                    strokeWidth="1.5"
                    style={{
                      stroke: isStarted ? "transparent" : "white",
                      fill: isStarted ? "white" : "transparent",
                      strokeDasharray: MAX_DASH,
                      strokeDashoffset: currentDashOffset,
                      transition: "fill 1s ease, stroke 1s ease"
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
            {isStarted && (
              <ScrollIndicator />
            )}
          </section>

          <NewsSection news={newsData} />
          <LiveSection events={eventData} />
          <AboutSection />
          <MediaSection />
        </>
      )}
    </main>
  );
}