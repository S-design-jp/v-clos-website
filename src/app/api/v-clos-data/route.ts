import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getNewsDetail, getEventDetail } from '@/libs/microcms';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');       // 記事ID
    const draftKey = searchParams.get('draftKey'); // 下書きキー
    const type = searchParams.get('type'); // 'news' か 'events' か判別用に追加すると便利

    if (!slug || !draftKey) {
        return new Response('Missing parameters', { status: 400 });
    }

    // 記事が存在するか確認
    // ※簡易的にニュースかイベントかどちらかで確認、あるいはURLパラメータで分岐
    let post = null;
    if (type === 'events') {
        post = await getEventDetail(slug, draftKey).catch(() => null);
    } else {
        post = await getNewsDetail(slug, draftKey).catch(() => null);
    }

    if (!post) {
        return new Response('Invalid slug', { status: 401 });
    }

    const draft = await draftMode();
    draft.enable();

    // プレビュー画面へリダイレクト
    // (タイプに応じて遷移先を変える)
    const directory = type === 'events' ? 'events' : 'news';
    redirect(`/${directory}/${slug}?dk=${draftKey}`);
}