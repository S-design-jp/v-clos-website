import Link from "next/link";
import { getAllNews } from "@/libs/microcms";
import Scene from "@/components/Scene"; // 背景用 (mode="low"で使う)
import TextScramble from "@/components/TextScramble";

export default async function NewsPage() {
    // サーバーコンポーネントなので直接データを取得可能
    const news = await getAllNews();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };

    return (
        <main className="relative w-full min-h-screen text-white pt-32 pb-20 px-6 bg-black">

            {/* 背景: Lowモード(結晶なし・軽量)を強制適用して、パーティクルだけ表示させる裏技 */}
            {/* ※もしパーティクルも消えてしまう設定にしていた場合は、Scene側を少し調整するか、別途Particleだけのコンポーネントを作ると良いです。
         一旦 mode="low" で試してみましょう。 */}
            <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
                {/* クライアントコンポーネントとして読み込む必要があるため、厳密にはここだけ "use client" の別ファイルに切り出すのがベストですが、一旦簡易的に配置 */}
            </div>

            {/* ヘッダー */}
            <div className="max-w-4xl mx-auto mb-20">
                <h1 className="text-4xl md:text-6xl font-bold font-jura tracking-tighter mb-4">
                    <TextScramble text="NEWS ARCHIVE" />
                </h1>
                <div className="w-full h-[1px] bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>

            {/* ニュースリスト */}
            <div className="max-w-4xl mx-auto grid gap-8">
                {news.map((item) => (
                    <Link
                        href={`/news/${item.id}`}
                        key={item.id}
                        className="group relative block p-8 border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                        <div className="flex flex-col md:flex-row gap-4 md:items-baseline justify-between mb-2">
                            <span className="font-jura text-cyan-400 tracking-widest text-sm">
                                {formatDate(item.publishedAt)}
                            </span>
                            <h2 className="text-xl md:text-2xl font-bold font-noto group-hover:text-cyan-400 transition-colors">
                                {item.title}
                            </h2>
                        </div>
                        <p className="text-gray-400 text-sm font-noto line-clamp-2">
                            {item.summary}
                        </p>

                        {/* ホバー時の矢印 */}
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">
                            →
                        </span>
                    </Link>
                ))}
            </div>

        </main>
    );
}