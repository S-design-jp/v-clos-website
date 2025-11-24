"use client";

import { useState, useEffect } from "react";
import TextScramble from "@/components/TextScramble";
import NewsSection from "@/components/NewsSection";
import LiveSection from "@/components/LiveSection";
import AboutSection from "@/components/AboutSection";
import MediaSection from "@/components/MediaSection";
import { useGlobalState } from "@/context/GlobalContext";
import type { News, Event } from "@/libs/microcms";

export default function Home() {
  // グローバルステートから情報をもらう
  const { isStarted, progress, isLoaded, qualityMode } = useGlobalState();

  const [newsData, setNewsData] = useState<News[]>([]);
  const [eventData, setEventData] = useState<Event[]>([]);

  // データ取得のみここで行う
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v-clos-data");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (data.news) setNewsData(data.news);
        if (data.events) setEventData(data.events);
      } catch (e) {
        console.error("Failed to fetch data:", e);
      }
    };
    fetchData();
  }, []);

  // ロゴ線画の設定
  const MAX_DASH = 3000;
  const currentDashOffset = isLoaded ? 0 : MAX_DASH - (MAX_DASH * (progress / 100));

  return (
    <main className="relative w-full min-h-screen text-white cursor-none font-sans bg-transparent">

      {/* qualityModeが決まったら中身を表示 */}
      {qualityMode && (
        <>
          {/* === HERO SECTION === */}
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
                <TextScramble text="Virtual - Connect Live of synthesis" duration={2500} delay={800} start={isStarted} />
              </p>
            </h1>

            {isStarted && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_ease-out_forwards] delay-1000">
                <span className="text-[10px] tracking-widest font-jura">SCROLL</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
              </div>
            )}
          </section>

          <NewsSection news={newsData} />
          <LiveSection events={eventData} />
          <AboutSection />
          <MediaSection />
          {/* Footerはlayout.tsxに移動したのでここでは不要 */}
        </>
      )}
    </main>
  );
}