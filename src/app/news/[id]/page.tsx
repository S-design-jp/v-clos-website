import { getNewsDetail, getAllNews } from "@/libs/microcms";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import parse from "html-react-parser";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ dk?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { id } = await params;
    const { dk } = await searchParams;

    const post = await getNewsDetail(id, dk).catch(() => null);

    if (!post) {
        return {
            title: "News Not Found",
        };
    }

    return {
        title: post.title,
        description: post.summary || post.title,
        openGraph: {
            title: post.title,
            description: post.summary || post.title,
            type: "article",
        },
    };
}

export async function generateStaticParams() {
    const contents = await getAllNews();
    return contents.map((post) => ({
        id: post.id,
    }));
}

export default async function NewsDetailPage({ params, searchParams }: Props) {
    const { id } = await params;
    const { dk } = await searchParams;
    const { isEnabled } = await draftMode();

    const post = await getNewsDetail(id, isEnabled ? dk : undefined).catch(() => null);

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

            <article className="max-w-4xl mx-auto">
                <div className="mb-10 border-b border-white/20 pb-10">
                    <div className="flex items-center gap-4 text-gray-400 font-jura text-sm mb-4">
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString()}
                        </time>
                        <span className="px-2 py-0.5 border border-white/20 text-xs">NEWS</span>
                    </div>

                    <h1 className="text-xl md:text-5xl font-bold leading-tight font-noto">
                        {post.title}
                    </h1>
                </div>

                <div className="prose prose-invert prose-lg max-w-none font-noto">
                    {parse(post.body)}
                </div>
            </article>
        </main>
    );
}