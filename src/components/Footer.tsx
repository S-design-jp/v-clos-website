"use client";

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 w-full bg-black border-t border-white/10 font-jura text-white overflow-hidden">

            <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10">

                {/* col 1: ロゴ & コンセプト */}
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between min-h-[200px]">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter mb-2">V-CLos</h2>
                        <p className="text-[10px] text-gray-500 tracking-widest">
                            VIRTUAL / VISUAL / VOCAL
                        </p>
                    </div>
                    <div className="mt-8">
                        <p className="text-[10px] text-gray-600 leading-relaxed">
                            SENZOKU GAKUEN COLLEGE OF MUSIC<br />
                            3DCG LIVE PRODUCTION PROJECT
                        </p>
                    </div>
                </div>

                {/* col 2: サイトマップ */}
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-4">
                    <span className="text-[10px] text-cyan-400 tracking-[0.2em] mb-2 block">SITEMAP</span>
                    <ul className="space-y-3 text-sm tracking-wider">
                        {[
                            { name: "TOP", href: "/" },
                            { name: "NEWS", href: "/news" },
                            { name: "LIVE / EVENT", href: "/events" },
                            { name: "ABOUT US", href: "/about" },
                            { name: "CONTACT", href: "/contact" },
                        ].map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                                    <span className="w-1 h-1 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* col 3: ソーシャル */}
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-4">
                    <span className="text-[10px] text-cyan-400 tracking-[0.2em] mb-2 block">SOCIAL</span>
                    <ul className="space-y-3 text-sm tracking-wider">
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                                <span className="text-xs">𝕏</span>
                                <span className="group-hover:translate-x-1 transition-transform">X (Twitter)</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                                <span className="text-xs">▶</span>
                                <span className="group-hover:translate-x-1 transition-transform">YouTube</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* col 4: ステータス & 設定 */}
                <div className="p-8 md:p-12 flex flex-col justify-between bg-white/5">
                    <div>
                        <span className="text-[10px] text-gray-500 tracking-[0.2em] mb-4 block">SYSTEM STATUS</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                            <span className="text-xs text-green-500 tracking-widest">ALL SYSTEMS NOMINAL</span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={() => {
                                localStorage.removeItem("v-clos-quality");
                                window.location.reload();
                            }}
                            className="text-[10px] text-gray-600 hover:text-cyan-400 transition-colors border border-gray-800 hover:border-cyan-400 px-3 py-2 w-full text-center"
                        >
                            RESET GRAPHIC SETTINGS
                        </button>
                    </div>
                </div>

            </div>

            {/* 最下部コピーライト & ポリシーリンク */}
            <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 tracking-widest bg-black">
                <p>© 2024-{currentYear} PROJECT V-CLos. All Rights Reserved.</p>
                <div className="flex gap-6 mt-2 md:mt-0">
                    {/* 修正箇所: SITE POLICY と CREDITS に変更 */}
                    <Link href="/policy" className="hover:text-white transition-colors">SITE POLICY</Link>
                    <Link href="/credits" className="hover:text-white transition-colors">CREDITS</Link>
                </div>
            </div>

        </footer>
    );
}