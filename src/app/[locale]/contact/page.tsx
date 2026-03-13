import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "CONTACT",
    description: "V-CLosへのご依頼・お問い合わせはこちらのフォームよりお願いいたします。",
    openGraph: {
        title: "CONTACT | V-CLos",
        description: "V-CLosへのご依頼・お問い合わせはこちらのフォームよりお願いいたします。",
        locale: "ja_JP",
        images: [{ url: "/ogp-default.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CONTACT | V-CLos",
    },
};

export default function ContactPage() {
    return <ContactClient />;
}