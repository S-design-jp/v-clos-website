import { MetadataRoute } from "next";
import { getAllNews, getAllEvents } from "@/libs/microcms";

const SITE_URL = "https://v-clos.jp";

const locales = ["", "en"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPaths = [
        "",
        "/news",
        "/events",
        "/about",
        "/contact",
        "/policy",
        "/credits",
    ];

    const staticRoutes = staticPaths.flatMap((path) =>
        locales.map((locale) => ({
            url: `${SITE_URL}${locale ? `/${locale}` : ""}${path}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: path === "" ? 1 : 0.8,
        }))
    );

    const news = await getAllNews();
    const newsRoutes = news.flatMap((item) =>
        locales.map((locale) => ({
            url: `${SITE_URL}${locale ? `/${locale}` : ""}/news/${item.id}`,
            lastModified: new Date(item.publishedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }))
    );

    const events = await getAllEvents();
    const eventRoutes = events.flatMap((item) =>
        locales.map((locale) => ({
            url: `${SITE_URL}${locale ? `/${locale}` : ""}/events/${item.id}`,
            lastModified: new Date(item.publishedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }))
    );

    return [...staticRoutes, ...newsRoutes, ...eventRoutes];
}