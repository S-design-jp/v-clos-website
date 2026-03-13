import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "ABOUT US",
    description: "V-CLosは、洗足学園音楽大学の学生が主体となり、次世代のエンターテイメントを追求する3DCGライブ制作団体です。",
    openGraph: {
        title: "ABOUT US | V-CLos",
        description: "V-CLosは、洗足学園音楽大学の学生が主体となる3DCGライブ制作団体です。",
        locale: "ja_JP",
        images: [{ url: "/ogp-default.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "ABOUT US | V-CLos",
        description: "V-CLosは、洗足学園音楽大学の学生が主体となる3DCGライブ制作団体です。",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}