"use client";

import Link from "next/link";
import TextScramble from "@/components/TextScramble";
import Tilt from "react-parallax-tilt";
import { useTranslations, useLocale } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('AboutPage');
    const locale = useLocale();

    // 辞書から動的に配列データを構築（ローカライゼーションの適用）
    const TEAMS = [
        {
            name: t('team.roles.performance.name'),
            role: t('team.roles.performance.role'),
            description: t('team.roles.performance.desc')
        },
        {
            name: t('team.roles.sound.name'),
            role: t('team.roles.sound.role'),
            description: t('team.roles.sound.desc')
        },
        {
            name: t('team.roles.visual.name'),
            role: t('team.roles.visual.role'),
            description: t('team.roles.visual.desc')
        },
        {
            name: t('team.roles.pr.name'),
            role: t('team.roles.pr.role'),
            description: t('team.roles.pr.desc')
        }
    ];

    return (
        <main className="relative w-full min-h-screen text-white bg-black font-noto selection:bg-white selection:text-black">

            {/* === 背景演出 (軽量版) === */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* === ヘッダー === */}
            <div className="relative z-10 pt-32 pb-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-jura tracking-widest mb-4">
                    <TextScramble text={t('title')} />
                </h1>
                <div className="w-24 h-[1px] bg-cyan-400 mx-auto" />
            </div>

            {/* === コンテンツエリア === */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-32 pb-32">

                {/* 1. V-CLosとは */}
                <section>
                    <h2 className="text-xl md:text-2xl font-jura text-cyan-400 tracking-widest mb-8 border-l-2 border-cyan-400 pl-4">
                        <TextScramble text={t('whoWeAre.title')} />
                    </h2>
                    <div className="space-y-6 text-gray-300 leading-loose tracking-wide text-justify">
                        <p>{t('whoWeAre.p1')}</p>
                        <p>
                            {/* JSON内の <highlight> タグを Tailwnind クラス付きの span へと変換 */}
                            {t.rich('whoWeAre.p2', {
                                highlight: (chunks) => <span className="text-white font-bold">{chunks}</span>
                            })}
                        </p>
                        <p>{t('whoWeAre.p3')}</p>
                    </div>
                </section>

                {/* 2. VOCA-Fes Series */}
                <section className="relative p-8 md:p-12 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

                    <h2 className="relative z-10 text-xl md:text-3xl font-bold mb-8 font-jura flex flex-wrap items-center gap-4">
                        VOCA-Fes Series
                        <span className="text-xs text-cyan-400 border border-cyan-400 px-2 py-0.5 rounded tracking-wider font-normal whitespace-nowrap">
                            {t('vocaFes.tag')}
                        </span>
                    </h2>

                    <div className="relative z-10 space-y-6 text-gray-300 leading-loose text-justify">
                        <p>{t('vocaFes.p1')}</p>
                        <p>
                            {/* JSON内の <underline> タグを境界線付きのスタイルへと変換 */}
                            {t.rich('vocaFes.p2', {
                                underline: (chunks) => <span className="text-white font-bold border-b border-cyan-500/50">{chunks}</span>
                            })}
                        </p>
                        <p>
                            {t.rich('vocaFes.p3', {
                                highlight: (chunks) => <span className="text-white font-bold">{chunks}</span>
                            })}
                        </p>
                    </div>
                </section>

                {/* 3. TEAM Structure */}
                <section>
                    <h2 className="text-xl md:text-2xl font-jura text-cyan-400 tracking-widest mb-12 text-center">
                        <TextScramble text={t('team.title')} />
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {TEAMS.map((team, index) => (
                            <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full">
                                <div className="h-full p-8 border border-white/10 bg-black/40 hover:bg-white/5 hover:border-cyan-400/50 transition-all duration-300 rounded relative group overflow-hidden">
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

                    <p className="mt-8 text-sm text-gray-500 text-center leading-relaxed">
                        {/* JSON内の <br></br> タグをレスポンシブな改行要素へと変換 */}
                        {t.rich('team.footer', {
                            br: () => <br className="hidden md:block" />
                        })}
                    </p>
                </section>

                {/* 4. MISSION & VISION */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 py-12 border-t border-b border-white/10">
                    <div className="text-center md:text-left space-y-4">
                        <h3 className="text-3xl font-jura font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            {t('mission.label')}
                        </h3>
                        <p className="text-xs text-gray-500 font-jura tracking-[0.2em] mb-2">{t('mission.sub')}</p>
                        <p className="text-xl md:text-2xl font-bold leading-relaxed">
                            {t.rich('mission.text', {
                                br: () => <br />
                            })}
                        </p>
                    </div>

                    <div className="text-center md:text-right space-y-4">
                        <h3 className="text-3xl font-jura font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            {t('vision.label')}
                        </h3>
                        <p className="text-xs text-gray-500 font-jura tracking-[0.2em] mb-2">{t('vision.sub')}</p>
                        <p className="text-xl md:text-2xl font-bold leading-relaxed">
                            {t.rich('vision.text', {
                                br: () => <br />
                            })}
                        </p>
                    </div>
                </section>

                {/* 5. CONTACT */}
                <section className="text-center space-y-8 pt-10">
                    <p className="text-gray-400 leading-relaxed">
                        {t.rich('contact.text', {
                            br: () => <br />
                        })}
                    </p>

                    <div className="flex justify-center">
                        <Link href={`/${locale}/contact`} className="group relative px-12 py-4 border border-white/20 overflow-hidden font-jura text-sm tracking-[0.2em] transition-all hover:border-cyan-400/50">
                            <span className="relative z-10 group-hover:text-black transition-colors">{t('contact.button')}</span>
                            <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    );
}