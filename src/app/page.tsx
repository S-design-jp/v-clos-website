"use client";

import { useState, useEffect } from "react";
// 各コンポーネントのインポート
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

// 型定義のインポート
import type { News, Event } from "@/libs/microcms";

export default function Home() {
  // === ステート管理 ===
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // ロード完了（100%到達）
  const [qualityMode, setQualityMode] = useState<"high" | "mid" | "low" | null>(null); // 画質モード
  const [isStarted, setIsStarted] = useState(false); // サイト開始（フェードイン完了）

  // CMSデータ
  const [newsData, setNewsData] = useState<News[]>([]);
  const [eventData, setEventData] = useState<Event[]>([]);

  // === 1. 初期化・ローディング・データ取得 ===
  useEffect(() => {
    const DURATION = 2500; // ローディング時間
    const startTime = Date.now();

    // データ取得関数 (非同期)
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

    // ★スキップ判定: セッションストレージ(訪問済みフラグ)を確認
    const hasVisited = sessionStorage.getItem("v-clos-visited");

    if (hasVisited) {
      // 訪問済みならローディングを即完了状態にする
      setProgress(100);
      setIsLoaded(true);

      // ★自動選択: ローカルストレージ(画質設定)を確認
      const savedMode = localStorage.getItem("v-clos-quality") as "high" | "mid" | "low" | null;
      if (savedMode) {
        setQualityMode(savedMode);
        setIsStarted(true); // モード選択もスキップして即開始
      }

      // データ取得だけ裏で走らせる
      fetchData();
      return; // アニメーションループを開始せずに終了
    }

    // 未訪問なら通常のアニメーションを実行
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const percent = Math.min(100, Math.floor((elapsed / DURATION) * 100));

      setProgress(percent);

      if (percent < 100) {
        requestAnimationFrame(animate);
      } else {
        // 100%になったら完了
        setTimeout(() => {
          setIsLoaded(true);
          // 訪問済みフラグを保存
          sessionStorage.setItem("v-clos-visited", "true");
        }, 500);
      }
    };
    requestAnimationFrame(animate);

    // データ取得
    fetchData();

  }, []);

  // === 2. モード選択時の処理 ===
  const handleSelectMode = (mode: "high" | "mid" | "low") => {
    setQualityMode(mode);
    // ★設定を保存 (次回から自動選択)
    localStorage.setItem("v-clos-quality", mode);

    setTimeout(() => {
      setIsStarted(true);
    }, 300);
  };

  // === 3. スクロール制御 ===
  useEffect(() => {
    document.body.style.overflow = isStarted ? "auto" : "hidden";
  }, [isStarted]);

  // === 4. ロゴ線画の設定 ===
  const MAX_DASH = 3000;
  // ロード完了後は線を全表示(0)にする
  const currentDashOffset = isLoaded ? 0 : MAX_DASH - (MAX_DASH * (progress / 100));

  return (
    <main className="relative w-full min-h-screen text-white cursor-none font-sans bg-black/0">

      <PrismCursor />

      {/* ローディング画面 (未完了時のみ) */}
      {!isLoaded && <LoadingScreen progress={progress} isFading={false} />}

      {/* モード選択画面 (ロード完了 かつ モード未決定時) */}
      {isLoaded && !qualityMode && (
        <QualitySelector onSelect={handleSelectMode} />
      )}

      {/* メインコンテンツ */}
      {qualityMode && (
        <>
          {/* フェードイン用カバー */}
          <div className={`fixed inset-0 z-[60] bg-black pointer-events-none transition-opacity duration-1000 ${isStarted ? "opacity-0" : "opacity-100"}`} />

          <Scene mode={qualityMode} />
          <ScrollDimmer />

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
                <TextScramble text="Virtual - Connect Live of synthesis" duration={2000} delay={800} start={isStarted} />
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
        </>
      )}
    </main>
  );
}