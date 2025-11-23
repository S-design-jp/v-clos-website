import { getNewsDetail, getAllNews } from "@/libs/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
    const contents = await getAllNews();
    return contents.map((post) => ({
        id: post.id,
    }));
}

interface Props {
    params: Promise<{ id: string }>; // Promise型に変更
}

export default async function NewsDetailPage({ params }: Props) {
    // ★ここが重要: params を await してから id を取り出す
    const { id } = await params;

    const post = await getNewsDetail(id).catch(() => null);

    if (!post) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };

    return (
        <main className="relative w-full min-h-screen text-white pt-40 pb-20 px-6 bg-black font-noto">

            <article className="max-w-3xl mx-auto">
                <header className="mb-16 border-b border-white/20 pb-8">
                    <div className="font-jura text-cyan-400 tracking-widest mb-4">
                        {formatDate(post.publishedAt)}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        {post.title}
                    </h1>
                </header>

                <div
                    className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white 
            prose-p:text-gray-300 prose-p:leading-loose
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-lg prose-img:border prose-img:border-white/10"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                />
            </article>

            <div className="max-w-3xl mx-auto mt-20 text-center">
                <Link
                    href="/news"
                    className="inline-block px-8 py-3 border border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-colors font-jura tracking-widest text-sm"
                >
                    BACK TO LIST
                </Link>
            </div>

        </main>
    );
}