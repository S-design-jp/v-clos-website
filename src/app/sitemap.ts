import { MetadataRoute } from "next";
import { getAllNews, getAllEvents } from "@/libs/microcms";

const SITE_URL = "https://v-clos.jp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        "",
        "/news",
        "/events",
        "/about",
        "/contact",
        "/policy",
        "/credits",
    ].map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    const news = await getAllNews();
    const newsRoutes = news.map((item) => ({
        url: `${SITE_URL}/news/${item.id}`,
        lastModified: new Date(item.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const events = await getAllEvents();
    const eventRoutes = events.map((item) => ({
        url: `${SITE_URL}/events/${item.id}`,
        lastModified: new Date(item.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...newsRoutes, ...eventRoutes];
}