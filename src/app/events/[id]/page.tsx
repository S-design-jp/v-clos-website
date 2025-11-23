import { getEventDetail, getAllEvents } from "@/libs/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
    const contents = await getAllEvents();
    return contents.map((post) => ({ id: post.id }));
}

interface Props {
    params: Promise<{ id: string }>; // Promise型に変更
}

export default async function EventDetailPage({ params }: Props) {
    // ★ここが重要: params を await する
    const { id } = await params;

    const event = await getEventDetail(id).catch(() => null);

    if (!event) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <main className="relative w-full min-h-screen text-white bg-black font-noto">

            <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                {(event.mainImage?.url || event.thumbnail?.url) ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.mainImage?.url || event.thumbnail?.url})` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-black" />
                )}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                    <span className="inline-block px-4 py-1 border border-cyan-400 text-cyan-400 text-xs tracking-widest mb-6">
                        {event.status}
                    </span>
                    <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
                        {event.title}
                    </h1>
                    <p className="text-xl font-jura tracking-widest text-gray-300">
                        {formatDate(event.date)} @ {event.venue}
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto py-20 px-6">
                <div
                    className="prose prose-invert prose-lg max-w-none
            prose-p:text-gray-300 prose-p:leading-loose
            prose-headings:font-bold prose-headings:text-cyan-400
            prose-a:text-cyan-400"
                    dangerouslySetInnerHTML={{ __html: event.description || "" }}
                />

                <div className="mt-24 pt-10 border-t border-white/10 text-center">
                    <Link
                        href="/events"
                        className="inline-block px-10 py-3 border border-white/20 hover:bg-white hover:text-black transition-all font-jura tracking-widest text-sm"
                    >
                        BACK TO EVENTS
                    </Link>
                </div>
            </div>

        </main>
    );
}