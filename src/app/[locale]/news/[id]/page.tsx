import { getNewsDetail, getAllNews } from "@/libs/microcms";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import parse, { domToReact, HTMLReactParserOptions, Element } from "html-react-parser";
import Image from "next/image";

const parserOptions: HTMLReactParserOptions = {
    replace(domNode) {
        if (domNode instanceof Element && domNode.name === "img") {
            const { src, alt, width, height } = domNode.attribs;

            // srcが空の場合はスキップ
            if (!src) return;

            return (
                <Image
                    src={src}
                    alt={alt || ""}
                    width={Number(width) || 800}
                    height={Number(height) || 600}
                    className="w-full h-auto rounded"
                />
            );
        }
    },
};

type Props = {
    params: Promise<{ locale: string; id: string }>;
    searchParams: Promise<{ dk?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { locale, id } = await params;
    const { dk } = await searchParams;

    const post = await getNewsDetail(id, dk).catch(() => null);

    if (!post) {
        return {
            title: "News Not Found",
        };
    }

    const displayTitle = locale === "en" && post.title_en ? post.title_en : post.title;
    const displaySummary = locale === "en" && post.summary_en ? post.summary_en : post.summary;
    const ogpImage = post.thumbnail?.url
        ? { url: post.thumbnail.url, width: 1200, height: 630 }
        : { url: "/ogp-default.png", width: 1200, height: 630 };

    return {
        title: displayTitle,
        description: displaySummary || displayTitle,
        openGraph: {
            title: displayTitle,
            description: displaySummary || displayTitle,
            type: "article",
            locale: "ja_JP",
            images: [ogpImage],
        },
        twitter: {
            card: "summary_large_image",
            title: displayTitle,
            description: displaySummary || displayTitle,
            images: [ogpImage.url],
        },
    };
}

export async function generateStaticParams() {
    const contents = await getAllNews().catch(() => []);

    const params: { locale: string; id: string }[] = [];

    contents.forEach((post) => {
        params.push({ locale: "ja", id: post.id });
        params.push({ locale: "en", id: post.id });
    });

    return params;
}

export default async function NewsDetailPage({ params, searchParams }: Props) {
    const { locale, id } = await params;
    const { dk } = await searchParams;
    const { isEnabled } = await draftMode();

    const post = await getNewsDetail(id, isEnabled ? dk : undefined).catch(() => null);

    if (!post) {
        notFound();
    }

    const displayTitle = locale === "en" && post.title_en ? post.title_en : post.title;
    const displayBody = locale === "en" && post.body_en ? post.body_en : post.body;

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
                        {displayTitle}
                    </h1>
                </div>

                <div className="prose prose-invert prose-lg max-w-none font-noto">
                    {parse(displayBody, parserOptions)}
                </div>
            </article>
        </main>
    );
}