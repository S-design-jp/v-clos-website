"use client";

import Link from "next/link";
import TextScramble from "@/components/TextScramble";

export default function PolicyPage() {
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
                    <TextScramble text="SITE POLICY" />
                </h1>
                <div className="w-24 h-[1px] bg-cyan-400 mx-auto" />
            </div>

            {/* コンテンツエリア */}
            <div className="relative z-10 max-w-3xl mx-auto space-y-16 text-gray-300 leading-loose">

                <section>
                    <h2 className="text-lg font-bold text-white mb-4 border-l-2 border-cyan-400 pl-3">当サイトについて</h2>
                    <p>
                        V-CLos オフィシャルサイト（以下「当サイト」といいます）は、洗足学園音楽大学の学生団体「V-CLos」の公式情報発信サイトです。
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-white mb-4 border-l-2 border-cyan-400 pl-3">著作権について</h2>
                    <p>
                        当サイトで公開されているテキスト、画像、動画、音楽、音声、その他のすべてのコンテンツの著作権は、V-CLosまたは正当な権利を有する第三者に帰属します。<br />
                        法律によって認められる私的利用の範囲を超えて、これらのコンテンツを無断で複製、公衆送信、改変、転載することはできません。
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-white mb-4 border-l-2 border-cyan-400 pl-3">免責事項</h2>
                    <p>
                        当サイトの情報については、細心の注意を払って掲載しておりますが、その正確性、完全性、有用性を保証するものではありません。<br />
                        当サイトの情報を利用したことによって生じたいかなる損害についても、V-CLosは一切の責任を負いません。<br />
                        当サイトのURLやコンテンツは、予告なく変更または削除される場合があります。
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-white mb-4 border-l-2 border-cyan-400 pl-3">個人情報の取り扱いについて (プライバシーポリシー)</h2>
                    <p>
                        当サイトでは、お問い合わせフォーム（Googleフォーム）を通じて、お名前、メールアドレス、お問い合わせ内容などの個人情報を取得する場合があります。<br />
                        取得した個人情報は、お問い合わせへの返信およびご連絡の目的でのみ利用し、ご本人の同意なく第三者に開示することはありません（法令に基づく場合を除く）。<br />
                        <br />
                        当サイトのお問い合わせフォームは、Google LLCの提供するGoogleフォームサービスを利用しています。同サービスを通じて収集された情報には、Googleのプライバシーポリシーが適用されます。
                    </p>
                </section>

                {/* お問い合わせへの誘導 */}
                <section className="text-center pt-10 border-t border-white/10">
                    <p className="mb-8 text-sm text-gray-400">
                        当サイトのポリシーに関するご質問は<br />
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