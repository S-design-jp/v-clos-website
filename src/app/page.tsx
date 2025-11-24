"use client";

import { useState, useEffect } from "react";
import TextScramble from "@/components/TextScramble";
import NewsSection from "@/components/NewsSection";
import LiveSection from "@/components/LiveSection";
import AboutSection from "@/components/AboutSection";
import MediaSection from "@/components/MediaSection";
import { useGlobalState } from "@/context/GlobalContext";
import type { News, Event } from "@/libs/microcms";
import Image from "next/image";

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

              <div className={`relative w-[90vw] md:w-[600px] h-auto transition-opacity duration-1000 ${isStarted ? "opacity-100" : "opacity-0"}`}>
                <Image
                  src="/logo.png"
                  alt="V-CLos"
                  width={600}
                  height={160}
                  priority
                  className="w-full h-auto object-contain"
                />
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