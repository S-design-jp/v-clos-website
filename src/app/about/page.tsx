"use client"; // ★この1行が必須です！

import Link from "next/link";
import TextScramble from "@/components/TextScramble";
import Tilt from "react-parallax-tilt";

// チーム構成のデータ
const TEAMS = [
    {
        name: "演奏班",
        role: "PERFORMANCE",
        description: "バンド演奏、マニピュレーター（同期音源の制御）、リードシート（譜面）制作を担当。"
    },
    {
        name: "サウンド班",
        role: "SOUND DESIGN",
        description: "シーケンス制作（打ち込み）、ボーカルの調声を担当。"
    },
    {
        name: "映像班",
        role: "VISUAL / MOTION",
        description: "学内モーションキャプチャシステムによる学生アクター自身のダンスキャプチャ、3Dモーション制作、背景映像（VJ）を担当。"
    },
    {
        name: "広報企画班",
        role: "PLANNING / PR",
        description: "ライブを広めるべく、企画・広報戦略の立案と実行を行います。"
    }
];

export default function AboutPage() {
    return (
        <main className="relative w-full min-h-screen text-white bg-black font-noto selection:bg-white selection:text-black">

            {/* === 背景演出 (軽量版) === */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* グリッド装飾 */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* === ヘッダー === */}
            <div className="relative z-10 pt-32 pb-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-jura tracking-widest mb-4">
                    <TextScramble text="ABOUT US" />
                </h1>
                <div className="w-24 h-[1px] bg-cyan-400 mx-auto" />
            </div>

            {/* === コンテンツエリア === */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-32 pb-32">

                {/* 1. V-CLosとは */}
                <section>
                    <h2 className="text-xl md:text-2xl font-jura text-cyan-400 tracking-widest mb-8 border-l-2 border-cyan-400 pl-4">
                        <TextScramble text="WHO WE ARE" />
                    </h2>
                    <div className="space-y-6 text-gray-300 leading-loose tracking-wide text-justify">
                        <p>
                            V-CLosは、洗足学園音楽大学の学生が主体となり、次世代のエンターテイメントを追求する3DCGライブ制作団体です。
                        </p>
                        <p>
                            私たちが目指すのは、音楽大学だからこそ可能な<span className="text-white font-bold">「生演奏の圧倒的な熱量」</span>と、モーションキャプチャシステムを駆使した<span className="text-white font-bold">「最先端の3DCG技術」</span>とを融合させた、唯一無二のバーチャル体験です。
                        </p>
                        <p>
                            企画から演奏、サウンドデザイン、CGモーション、そして映像演出に至るまで。そのすべてを学生の手で創造し、私たちにしかできない革新的な表現を発信し続けます。
                        </p>
                    </div>
                </section>

                {/* 2. VOCA-Fes Series */}
                <section className="relative p-8 md:p-12 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm overflow-hidden">
                    {/* 背景装飾 */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

                    <h2 className="relative z-10 text-xl md:text-3xl font-bold mb-8 font-jura flex items-center gap-4">
                        VOCA-Fes Series
                        <span className="text-xs text-cyan-400 border border-cyan-400 px-2 py-0.5 rounded tracking-wider font-normal">FLAGSHIP PROJECT</span>
                    </h2>

                    <div className="relative z-10 space-y-6 text-gray-300 leading-loose">
                        <p>
                            「VOCA-Fes Series」は、V-CLosが総力を結集して送るフラッグシップ・ライブプロジェクトです。
                        </p>
                        <p>
                            その核にあるのは<span className="text-white font-bold border-b border-cyan-500/50">「生演奏への徹底的なこだわり」</span>です。 他の多くのファンメイドライブが事前に録音された音源（前録り）を使用する中、VOCA-Fesではリアルタイムのバンド演奏が熱狂のグルーヴを生み出します。
                        </p>
                        <p>
                            また、このシリーズは私たちの<span className="text-white font-bold">「研究の結晶」</span>でもあります。 毎公演、「毎公演異なる技術的挑戦」をテーマに掲げ、ファンメイドライブの新たな可能性を切り開きます。
                        </p>
                    </div>
                </section>

                {/* 3. TEAM Structure */}
                <section>
                    <h2 className="text-xl md:text-2xl font-jura text-cyan-400 tracking-widest mb-12 text-center">
                        <TextScramble text="TEAM STRUCTURE" />
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {TEAMS.map((team, index) => (
                            <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full">
                                <div className="h-full p-8 border border-white/10 bg-black/40 hover:bg-white/5 hover:border-cyan-400/50 transition-all duration-300 rounded relative group overflow-hidden">
                                    {/* ホバー時の光 */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="text-xs font-jura text-cyan-400 mb-2">{team.role}</div>
                                        <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2 inline-block">{team.name}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {team.description}
                                        </p>
                                    </div>
                                </div>
                            </Tilt>
                        ))}
                    </div>

                    <p className="mt-8 text-sm text-gray-500 text-center">
                        これらV-CLos内部のセクションに加え、プロジェクト外部の学生スタッフ（照明・音響）と協力体制を敷くことで、<br className="hidden md:block" />
                        学内リソースを結集し、アカデミックな研究と現場の技術を両立させています。
                    </p>
                </section>

                {/* 4. MISSION & VISION */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 py-12 border-t border-b border-white/10">
                    {/* MISSION */}
                    <div className="text-center md:text-left space-y-4">
                        <h3 className="text-3xl font-jura font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            MISSION
                        </h3>
                        <p className="text-xs text-gray-500 font-jura tracking-[0.2em] mb-2">ミッション / 理念</p>
                        <p className="text-xl md:text-2xl font-bold leading-relaxed">
                            音大としての強みを存分に活かし、<br />
                            新体験を創造する。
                        </p>
                    </div>

                    {/* VISION */}
                    <div className="text-center md:text-right space-y-4">
                        <h3 className="text-3xl font-jura font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            VISION
                        </h3>
                        <p className="text-xs text-gray-500 font-jura tracking-[0.2em] mb-2">ビジョン / 未来像</p>
                        <p className="text-xl md:text-2xl font-bold leading-relaxed">
                            これまでにない新しい<br />
                            3DCGライブの可能性を模索する。
                        </p>
                    </div>
                </section>

                {/* 5. CONTACT */}
                <section className="text-center space-y-8 pt-10">
                    <p className="text-gray-400">
                        V-CLosの活動に関するご質問・ご依頼は<br />
                        CONTACTページよりお問い合わせください。
                    </p>

                    <div className="flex justify-center">
                        <Link href="/contact" className="group relative px-12 py-4 border border-white/20 overflow-hidden font-jura text-sm tracking-[0.2em] transition-all hover:border-cyan-400/50">
                            <span className="relative z-10 group-hover:text-black transition-colors">CONTACT US</span>
                            <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    );
}