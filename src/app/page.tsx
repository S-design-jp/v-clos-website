"use client";

import { useState, useEffect } from "react";
import Scene from "@/components/Scene";
import PrismCursor from "@/components/PrismCursor";
import TextScramble from "@/components/TextScramble";
import NewsSection from "@/components/NewsSection";
import LiveSection from "@/components/LiveSection";
import AboutSection from "@/components/AboutSection";
import MediaSection from "@/components/MediaSection";
import Footer from "@/components/Footer";
import ScrollDimmer from "@/components/ScrollDimmer";
import LoadingScreen from "@/components/LoadingScreen";
import QualitySelector from "@/components/QualitySelector";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [qualityMode, setQualityMode] = useState<"high" | "mid" | "low" | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const DURATION = 2500;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const percent = Math.min(100, Math.floor((elapsed / DURATION) * 100));

      setProgress(percent);

      if (percent < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const handleSelectMode = (mode: "high" | "mid" | "low") => {
    setQualityMode(mode);
    setTimeout(() => {
      setIsStarted(true);
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = isStarted ? "auto" : "hidden";
  }, [isStarted]);

  // 線の長さ設定
  const MAX_DASH = 3000;
  // ロード中は進捗に合わせて減らす
  const currentDashOffset = MAX_DASH - (MAX_DASH * (progress / 100));

  return (
    <main className="relative w-full min-h-screen text-white cursor-none font-sans bg-black/0">

      <PrismCursor />

      {!isLoaded && <LoadingScreen progress={progress} isFading={false} />}

      {isLoaded && !qualityMode && (
        <QualitySelector onSelect={handleSelectMode} />
      )}

      {qualityMode && (
        <>
          <div className={`fixed inset-0 z-[60] bg-black pointer-events-none transition-opacity duration-1000 ${isStarted ? "opacity-0" : "opacity-100"}`} />

          <Scene mode={qualityMode} />
          <ScrollDimmer />

          <section className="relative z-50 w-full h-screen flex flex-col justify-center items-center pointer-events-none">
            <h1 className="relative flex flex-col items-center font-bold tracking-tighter mix-blend-difference font-jura">

              {/* 上の文字: PROJECT */}
              {/* スマホ: text-[10px], PC: text-sm */}
              <span className="block text-cyan-400 opacity-80 text-[10px] md:text-sm tracking-[0.5em] md:tracking-[1em] mb-2 md:mb-4 pl-2 h-6">
                <TextScramble text="PROJECT" duration={800} delay={200} start={isStarted} />
              </span>

              {/* ロゴエリア */}
              {/* スマホ: 幅いっぱい, PC: 幅600px */}
              <div className="relative w-[90vw] h-[60px] md:w-[600px] md:h-[160px]">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    // スマホ: text-6xl, PC: text-8xl
                    className="font-jura font-bold text-6xl md:text-8xl"
                    strokeWidth="1.5"
                    style={{
                      // 開始したら線透明・白塗り、開始前は白線・透明塗り
                      stroke: isStarted ? "transparent" : "white",
                      fill: isStarted ? "white" : "transparent",

                      strokeDasharray: MAX_DASH,
                      // ロード完了(isLoaded)したら線は全部出す(0)、それ以外は計算値
                      strokeDashoffset: isLoaded ? 0 : currentDashOffset,

                      transition: "fill 1s ease, stroke 1s ease"
                    }}
                  >
                    V-CLos
                  </text>
                </svg>
              </div>

              {/* 下の文字: Virtual... */}
              {/* スマホ: text-[10px], PC: text-sm */}
              <p className="mt-2 text-[10px] md:text-sm text-gray-400 tracking-widest uppercase font-jura h-6">
                <TextScramble text="Virtual / Visual / Vocal" duration={2000} delay={800} start={isStarted} />
              </p>
            </h1>

            {isStarted && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_ease-out_forwards] delay-1000">
                <span className="text-[10px] tracking-widest font-jura">SCROLL</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
              </div>
            )}
          </section>

          <NewsSection />
          <LiveSection />
          <AboutSection />
          <MediaSection />
          <Footer />
        </>
      )}
    </main>
  );
}