import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
    apiKey: process.env.MICROCMS_API_KEY || "",
});

// --- ニュース (api: news) ---
export type News = {
    id: string;
    publishedAt: string;
    title: string;
    summary: string;
    body: string;
};

// --- イベント (api: events) ---
export type Event = {
    id: string;
    publishedAt: string;
    title: string;
    series?: string;
    date: string;
    status?: string;
    venue?: string;
    mainImage?: {
        url: string;
        height: number;
        width: number;
    };
    thumbnail?: {
        url: string;
        height: number;
        width: number;
    };
    description?: string;
};

// --- データ取得関数 ---

// ニュース一覧を取得
export const getNews = async () => {
    const data = await client.get({
        endpoint: "news",
        queries: { limit: 3 }
    });
    return data.contents as News[];
};

// イベント一覧を取得
export const getEvents = async () => {
    const data = await client.get({
        endpoint: "events",
        queries: { limit: 3 }
    });
    return data.contents as Event[];
};

// ★修正ポイント: ニュース詳細 (プレビュー対応)
export const getNewsDetail = async (contentId: string, draftKey?: string) => {
    // draftKey が undefined の時は queries オブジェクトに含めてはいけません
    const queries: any = {};
    if (draftKey) {
        queries.draftKey = draftKey;
    }

    const data = await client.getListDetail<News>({
        endpoint: "news",
        contentId,
        queries: queries // 修正したクエリを渡す
    });
    return data;
};

// ★修正ポイント: イベント詳細 (プレビュー対応)
export const getEventDetail = async (contentId: string, draftKey?: string) => {
    const queries: any = {};
    if (draftKey) {
        queries.draftKey = draftKey;
    }

    const data = await client.getListDetail<Event>({
        endpoint: "events",
        contentId,
        queries: queries // 修正したクエリを渡す
    });
    return data;
};

// 全ニュース取得
export const getAllNews = async () => {
    const data = await client.get({
        endpoint: "news",
        queries: { limit: 100 }
    });
    return data.contents as News[];
};

// 全イベント取得
export const getAllEvents = async () => {
    const data = await client.get({
        endpoint: "events",
        queries: { limit: 100 }
    });
    return data.contents as Event[];
};