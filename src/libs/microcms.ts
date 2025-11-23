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
    summary: string; // 概要 (一覧表示用)
    body: string;    // 本文 (詳細用)
};

// --- イベント (api: events) ---
export type Event = {
    id: string;
    publishedAt: string;
    title: string;
    series?: string; // シリーズ名 (任意)
    date: string;    // 開催日時 (必須)
    status?: string; // ステータス (例: 開催決定)
    venue?: string;  // 開催場所
    mainImage?: {    // 詳細用画像
        url: string;
        height: number;
        width: number;
    };
    thumbnail?: {    // 一覧用画像
        url: string;
        height: number;
        width: number;
    };
    description?: string; // 詳細説明
};

// --- データ取得関数 ---

export const getNews = async () => {
    const data = await client.get({
        endpoint: "news", // エンドポイント名
        queries: { limit: 3 } // 最新3件
    });
    return data.contents as News[];
};

export const getEvents = async () => {
    const data = await client.get({
        endpoint: "events", // エンドポイント名: events
        queries: { limit: 3 }
    });
    return data.contents as Event[];
};
export const getNewsDetail = async (contentId: string) => {
    const data = await client.getListDetail<News>({
        endpoint: "news",
        contentId,
    });
    return data;
};

// イベント詳細を取得
export const getEventDetail = async (contentId: string) => {
    const data = await client.getListDetail<Event>({
        endpoint: "events",
        contentId,
    });
    return data;
};

// ニュース一覧を件数指定で取得 (ページネーション用など)
export const getAllNews = async () => {
    const data = await client.get({
        endpoint: "news",
        queries: { limit: 100 } // とりあえず100件
    });
    return data.contents as News[];
};

// イベント一覧を件数指定で取得
export const getAllEvents = async () => {
    const data = await client.get({
        endpoint: "events",
        queries: { limit: 100 }
    });
    return data.contents as Event[];
};