"use server";

import { getNews, getEvents } from "@/libs/microcms";

export async function fetchTopData() {
    try {
        const news = await getNews();
        const events = await getEvents();
        return { news, events };
    } catch (error) {
        console.error("Failed to fetch top data:", error);
        return { news: [], events: [] };
    }
}