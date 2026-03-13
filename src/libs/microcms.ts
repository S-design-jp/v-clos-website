import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (typeof window === "undefined" && (!serviceDomain || !apiKey)) {
    throw new Error(
        "[microcms.ts] 環境変数が未設定です。\n" +
        "MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を .env.local または " +
        "Vercelの環境変数設定に追加してください。"
    );
}

export const client = createClient({
    serviceDomain: serviceDomain ?? "",
    apiKey: apiKey ?? "",
});

export type News = {
    id: string;
    publishedAt: string;
    title: string;
    title_en?: string;
    summary: string;
    summary_en?: string;
    body: string;
    body_en?: string;
    thumbnail?: { url: string; height: number; width: number; };
};

export type Event = {
    id: string;
    publishedAt: string;
    title: string;
    title_en?: string;
    series?: string;
    date: string;
    status?: string;
    venue?: string;
    venue_en?: string;
    mainImage?: { url: string; height: number; width: number; };
    thumbnail?: { url: string; height: number; width: number; };
    description?: string;
    description_en?: string;
};
export const getNews = async () => {
    const data = await client.get({ endpoint: "news", queries: { limit: 3 } });
    return data.contents as News[];
};

export const getAllNews = async () => {
    const data = await client.getList<News>({ endpoint: "news" });
    return data.contents;
};

export const getNewsDetail = async (contentId: string, draftKey?: string) => {
    const queries: any = {};
    if (draftKey) queries.draftKey = draftKey;

    return await client.getListDetail<News>({
        endpoint: "news",
        contentId,
        queries
    });
};

export const getEvents = async () => {
    const data = await client.get({ endpoint: "events", queries: { limit: 3 } });
    return data.contents as Event[];
};

export const getAllEvents = async () => {
    const data = await client.getList<Event>({ endpoint: "events" });
    return data.contents;
};

export const getEventDetail = async (contentId: string, draftKey?: string) => {
    const queries: any = {};
    if (draftKey) queries.draftKey = draftKey;

    return await client.getListDetail<Event>({
        endpoint: "events",
        contentId,
        queries
    });
};