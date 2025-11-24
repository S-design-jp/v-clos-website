"use client";

import TextScramble from "./TextScramble";

export default function MediaSection() {
    return (
        <section className="relative z-10 w-full bg-black border-t border-white/10">

            {/* リンク全体を巨大なボタンにする */}
            <a
                href="https://twitter.com/Project_V_CLos" // 仮のリンク
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full py-32 md:py-48 overflow-hidden cursor-none"
            >
                {/* 背景: ホバーするとノイズ画像やグリッドが走る */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:32px_32px] opacity-0 group-hover:opacity-20 transition-opacity duration-200" />

                {/* 背景の走査線アニメーション */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent translate-y-[-100%] group-hover:animate-[scanline_2s_linear_infinite]" />

                <div className="relative flex flex-col items-center justify-center gap-4">

                    {/* アイコン的な "X" 表示 */}
                    <div className="text-4xl md:text-6xl font-jura text-gray-500 group-hover:text-white transition-colors duration-300">
                        𝕏
                    </div>

                    {/* メインテキスト: ホバーで激しく色ズレ (RGB Shift) */}
                    <h2
                        className="text-5xl md:text-8xl font-bold tracking-tighter font-jura text-white transition-all duration-300 group-hover:scale-110"
                        style={{ textShadow: "0 0 0 transparent" }} // デフォルト
                    >
                        <span className="group-hover:animate-[glitch_0.3s_infinite]">
                            FOLLOW US
                        </span>
                    </h2>

                    <p className="text-sm tracking-[0.5em] font-jura text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <TextScramble text="CLICK TO CONNECT" duration={500} />
                    </p>
                </div>

            </a>

            {/* カスタムアニメーション定義 (Tailwind configに追加しなくてもここでstyleタグで定義可能) */}
            <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes glitch {
          0% { text-shadow: 2px 0 #00FFFF, -2px 0 #FF00FF; }
          25% { text-shadow: -2px 0 #00FFFF, 2px 0 #FF00FF; }
          50% { text-shadow: 2px 0 #00FFFF, -2px 0 #FF00FF; }
          75% { text-shadow: -2px 0 #00FFFF, 2px 0 #FF00FF; }
          100% { text-shadow: 2px 0 #00FFFF, -2px 0 #FF00FF; }
        }
      `}</style>
        </section>
    );
}