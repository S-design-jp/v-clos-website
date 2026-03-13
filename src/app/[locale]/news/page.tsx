import Link from "next/link";
import { getAllNews } from "@/libs/microcms";
import TextScramble from "@/components/TextScramble";

export default async function NewsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const news = await getAllNews();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };

    return (
        <main className="relative w-full min-h-screen text-white pt-32 pb-20 px-6 bg-black">

            <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
            </div>
            <div className="max-w-4xl mx-auto mb-20">
                <h1 className="text-4xl md:text-6xl font-bold font-jura tracking-tighter mb-4">
                    <TextScramble text="NEWS ARCHIVE" />
                </h1>
                <div className="w-full h-[1px] bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto grid gap-8">
                {news.map((item) => {
                    const displayTitle = locale === "en" && item.title_en ? item.title_en : item.title;
                    const displaySummary = locale === "en" && item.summary_en ? item.summary_en : item.summary;

                    return (
                        <Link
                            href={`/${locale}/news/${item.id}`}
                            key={item.id}
                            className="group relative block p-8 border-b border-white/10 hover:bg-white/5 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row gap-4 md:items-baseline justify-between mb-2">
                                <span className="font-jura text-cyan-400 tracking-widest text-sm">
                                    {formatDate(item.publishedAt)}
                                </span>
                                <h2 className="text-xl md:text-2xl font-bold font-noto group-hover:text-cyan-400 transition-colors">
                                    {displayTitle}
                                </h2>
                            </div>
                            <p className="text-gray-400 text-sm font-noto line-clamp-2">
                                {displaySummary}
                            </p>

                            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">
                                →
                            </span>
                        </Link>
                    );
                })}
            </div>

        </main>
    );
}