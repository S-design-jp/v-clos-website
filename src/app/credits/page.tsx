"use client";

import Link from "next/link";
import TextScramble from "@/components/TextScramble";

// 型定義を拡張して url (任意) を追加
type CreditModel = {
    name: string;
    author: string;
    url?: string; // リンク先URL
};

const MODELS: CreditModel[] = [
    { name: "ミク (Hatsune Miku)", author: "三目YYB" },
    { name: "リン・レン (Kagamine Rin/Len)", author: "三目YYB" },
    { name: "結月ゆかり (Yuzuki Yukari)", author: "ままま (公式モデル)" },
    { name: "IA", author: "お宮" },
    { name: "GUMI (Megpoid)", author: "ままま式V3" },
    { name: "GUMI V3ver (3xma)", author: "3xma", url: "http://3xma.blog49.fc2.com/blog-entry-16.html" },
];

export default function CreditsPage() {
    return (
        <main className="relative w-full min-h-screen text-white bg-black font-noto pt-32 pb-20 px-6">

            {/* 背景演出 */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* ヘッダー */}
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
                <h1 className="text-3xl md:text-5xl font-bold font-jura tracking-widest mb-4">
                    <TextScramble text="CREDITS" />
                </h1>
                <div className="w-24 h-[1px] bg-cyan-400 mx-auto" />
            </div>

            {/* コンテンツエリア */}
            <div className="relative z-10 max-w-3xl mx-auto">

                <section className="mb-20">
                    <h2 className="text-xl font-jura tracking-widest text-cyan-400 mb-8 text-center border-b border-white/10 pb-4">
                        SITE PHOTO 3D MODEL CREDITS
                    </h2>

                    <div className="grid gap-4">
                        {MODELS.map((model, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row justify-between items-baseline p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <span className="font-bold text-lg">{model.name}</span>

                                <span className="text-gray-400 font-jura">
                                    {/* URLがある場合はリンクにする */}
                                    {model.url ? (
                                        <a
                                            href={model.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-cyan-400 transition-colors border-b border-gray-600 hover:border-cyan-400 pb-0.5"
                                        >
                                            {model.author} ↗
                                        </a>
                                    ) : (
                                        model.author
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* お問い合わせへの誘導 */}
                <section className="text-center pt-10">
                    <p className="mb-8 text-sm text-gray-400">
                        V-CLosの活動に関するご質問は<br />
                        CONTACTページよりお問い合わせください。
                    </p>
                    <Link href="/contact" className="group relative inline-block px-12 py-4 border border-white/20 overflow-hidden font-jura text-sm tracking-[0.2em] transition-all hover:border-cyan-400/50">
                        <span className="relative z-10 group-hover:text-black transition-colors">CONTACT</span>
                        <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </Link>
                </section>

            </div>
        </main>
    );
}