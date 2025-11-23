import Link from "next/link";
import { getAllEvents } from "@/libs/microcms";
import TextScramble from "@/components/TextScramble";

export default async function EventsPage() {
    const events = await getAllEvents();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };

    return (
        <main className="relative w-full min-h-screen text-white pt-32 pb-20 px-6 bg-black">
            {/* ヘッダー */}
            <div className="max-w-6xl mx-auto mb-20 text-right">
                <h1 className="text-4xl md:text-6xl font-bold font-jura tracking-tighter mb-4">
                    <TextScramble text="LIVE & EVENTS" />
                </h1>
                <div className="w-full h-[1px] bg-gradient-to-l from-cyan-400/50 to-transparent" />
            </div>

            {/* イベントリスト (ポスター風レイアウト) */}
            <div className="max-w-6xl mx-auto space-y-16">
                {events.map((item) => (
                    <Link
                        href={`/events/${item.id}`}
                        key={item.id}
                        className="group relative block w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-white/10 rounded-lg"
                    >
                        {/* 背景画像 */}
                        {(item.mainImage?.url || item.thumbnail?.url) && (
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-80"
                                style={{ backgroundImage: `url(${item.mainImage?.url || item.thumbnail?.url})` }}
                            />
                        )}

                        {/* 情報オーバーレイ */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-8 flex flex-col justify-end">
                            <div className="font-jura text-cyan-400 tracking-widest mb-2">
                                {formatDate(item.date)}
                            </div>
                            <h2 className="text-2xl md:text-5xl font-bold font-noto mb-4 group-hover:text-cyan-400 transition-colors">
                                {item.title}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-gray-300 font-noto">
                                <span className="px-3 py-1 border border-white/30 rounded-full">{item.status || "INFO"}</span>
                                <span>{item.venue}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}