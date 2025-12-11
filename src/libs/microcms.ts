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

// ★修正: ニュース詳細 (プレビュー対応)
export const getNewsDetail = async (contentId: string, draftKey?: string) => {
    const data = await client.getListDetail<News>({
        endpoint: "news",
        contentId,
        queries: {
            draftKey: draftKey // draftKeyがあれば渡す
        }
    });
    return data;
};

// ★修正: イベント詳細 (プレビュー対応)
export const getEventDetail = async (contentId: string, draftKey?: string) => {
    const data = await client.getListDetail<Event>({
        endpoint: "events",
        contentId,
        queries: {
            draftKey: draftKey // draftKeyがあれば渡す
        }
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