"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // ランダムなロード数値を演出するためのステート
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // ページ遷移のたびに数値を0から100にする演出
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15) + 5; // ランダムに増やす
            });
        }, 50);
        return () => clearInterval(interval);
    }, [pathname]);

    return (
        <div className="relative">

            {/* 1. コンテンツ本体 */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }} // ゲートが開いた後に表示
            >
                {children}
            </motion.div>


            {/* 2. ゲームUI風トランジションレイヤー (最前面) */}
            <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">

                {/* 上半分のシャッター */}
                <motion.div
                    className="relative w-full bg-[#050505] border-b border-cyan-500/30 flex items-end justify-center overflow-hidden"
                    initial={{ height: "50vh" }}
                    animate={{ height: "0vh" }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.6 }} // 0.6秒待ってから開く
                >
                    {/* 背景のグリッド装飾 */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </motion.div>

                {/* 下半分のシャッター */}
                <motion.div
                    className="relative w-full bg-[#050505] border-t border-cyan-500/30 flex items-start justify-center overflow-hidden"
                    initial={{ height: "50vh" }}
                    animate={{ height: "0vh" }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                >
                    {/* 背景のグリッド装飾 */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </motion.div>

                {/* 3. 中央のHUD (ローディング表示) */}
                {/* シャッターが開く(0.6秒)前だけ表示して、パッと消す */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                >
                    <div className="flex flex-col items-center gap-2 w-64">
                        {/* テキスト情報 */}
                        <div className="flex justify-between w-full text-cyan-400 font-jura text-xs tracking-widest">
                            <span>SYSTEM_LOAD</span>
                            <span>{Math.min(progress, 100)}%</span>
                        </div>

                        {/* プログレスバー */}
                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* 装飾テキスト */}
                        <div className="text-[10px] text-gray-500 font-mono mt-1">
                            v-clos.sys.v2 // connecting...
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}