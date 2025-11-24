import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://v-clos.com/sitemap.xml", // ドメイン書き換えをお忘れなく
    };
}