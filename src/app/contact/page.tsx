"use client";

import TextScramble from "@/components/TextScramble";

export default function ContactPage() {
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScGIu6eKDjgdAW8yd3rcc6DjXNBcQ_X_TkCN8_ghNFBVsSJvw/viewform?embedded=true";

    return (
        <main className="relative w-full min-h-screen text-white bg-black font-noto pt-32 pb-20 px-6">

            {/* 背景演出 */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* ヘッダー */}
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold font-jura tracking-widest mb-4">
                    <TextScramble text="CONTACT" />
                </h1>
                <div className="w-24 h-[1px] bg-cyan-400 mx-auto mb-8" />
                <p className="text-gray-400 text-sm md:text-base leading-loose">
                    V-CLosへのご依頼・お問い合わせは<br className="md:hidden" />以下のフォームよりお願いいたします。
                </p>
            </div>

            {/* Googleフォーム埋め込みエリア */}
            <div className="relative z-10 max-w-3xl mx-auto w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
                {
                }
                <iframe
                    src={GOOGLE_FORM_URL}
                    width="100%"
                    height="1100" // 指定の1074より少しだけ余裕を持たせました
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    className="w-full"
                >
                    読み込んでいます…
                </iframe>
            </div>

        </main>
    );
}