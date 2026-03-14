import { Metadata } from "next";
import { getNews, getEvents } from "@/libs/microcms";
import HomeClient from "./HomeClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "V-CLos | Virtual-Connect Live of synthesis"
      : "V-CLos | Virtual-Connect Live of synthesis",
    description: isEn
      ? "V-CLos is a 3DCG live production collective driven by the students of Senzoku Gakuen College of Music."
      : "洗足学園音楽大学 3DCGライブ制作団体 V-CLos（ブイクロス）の公式サイトです。",
    openGraph: {
      title: "V-CLos Official Website",
      description: isEn
        ? "V-CLos is a 3DCG live production collective driven by the students of Senzoku Gakuen College of Music."
        : "洗足学園音楽大学 3DCGライブ制作団体 V-CLosの公式サイト。",
      url: "https://v-clos.jp",
      siteName: "V-CLos",
      locale: isEn ? "en_US" : "ja_JP",
      type: "website",
      images: [
        {
          url: "/ogp-default.png",
          width: 1200,
          height: 630,
          alt: "V-CLos Official Website",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "V-CLos Official Website",
      description: isEn
        ? "V-CLos — 3DCG Live Production"
        : "洗足学園音楽大学 V-CLos 公式サイト",
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  /*
   * サーバー側でデータを取得し、Client Component にpropsとして渡す。
   * 以前は useEffect 内で Server Action を呼んでいたため:
   *   - 初回レンダリング時はデータが空 → ガタつき発生
   *   - SSG が効かずページ全体が動的レンダリングになっていた
   */
  const [news, events] = await Promise.all([
    getNews().catch(() => []),
    getEvents().catch(() => []),
  ]);

  return <HomeClient locale={locale} news={news} events={events} />;
}