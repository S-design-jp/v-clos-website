import { NextResponse } from 'next/server';
import { getNews, getEvents } from '@/libs/microcms';

// 常に最新データを取得するように設定
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // サーバーサイドで安全にMicroCMSからデータを取得
        const news = await getNews();
        const events = await getEvents();

        // クライアント(page.tsx)にJSONとして返す
        return NextResponse.json({ news, events });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data', news: [], events: [] },
            { status: 500 }
        );
    }
}