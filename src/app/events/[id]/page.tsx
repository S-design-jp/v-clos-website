import { getEventDetail, getAllEvents } from "@/libs/microcms";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ dk?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { id } = await params;
    const { dk } = await searchParams;

    const post = await getEventDetail(id, dk).catch(() => null);

    if (!post) {
        return { title: "Event Not Found" };
    }
    const images = post.mainImage
        ? [{ url: post.mainImage.url, width: 1200, height: 630 }]
        : [];

    return {
        title: post.title,
        description: post.description ? post.description.slice(0, 100) + "..." : post.title,
        openGraph: {
            title: post.title,
            description: post.description?.slice(0, 100),
            type: "article",
            images: images,
        },
    };
}

export async function generateStaticParams() {
    const contents = await getAllEvents();
    return contents.map((post) => ({
        id: post.id,
    }));
}

export default async function EventDetailPage({ params, searchParams }: Props) {
    const { id } = await params;
    const { dk } = await searchParams;
    const { isEnabled } = await draftMode();

    const post = await getEventDetail(id, isEnabled ? dk : undefined).catch(() => null);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 font-sans">
            {isEnabled && (
                <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black text-center py-2 z-[1000] font-bold font-jura tracking-widest">
                    PREVIEW MODE
                    <a href="/api/disable-draft" className="ml-4 underline opacity-70 hover:opacity-100">Exit</a>
                </div>
            )}

            <article className="max-w-5xl mx-auto">
                {/* メイン画像があれば表示 */}
                {post.mainImage && (
                    <div className="relative w-full aspect-video mb-12 rounded-sm overflow-hidden border border-white/10">
                        <Image
                            src={post.mainImage.url}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-cyan-400 font-jura mb-4 tracking-widest">
                        <time className="text-xl">{new Date(post.date).toLocaleDateString()}</time>
                        {post.status && <span className="border border-cyan-400 px-3 py-0.5 text-sm">{post.status}</span>}
                    </div>

                    <h1 className="text-3xl md:text-6xl font-bold leading-tight font-noto mb-6">
                        {post.title}
                    </h1>

                    {post.venue && (
                        <p className="text-gray-400 font-noto">
                            Venue: <span className="text-white">{post.venue}</span>
                        </p>
                    )}
                </div>

                {post.description && (
                    <div className="prose prose-invert prose-lg max-w-none font-noto whitespace-pre-wrap">
                        {parse(post.description)}
                    </div>
                )}
            </article>
        </main>
    );
}