import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import HeaderLogo from "@/components/HeaderLogo";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const notojp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
});

const SITE_URL = "https://v-clos.jp";
const SITE_NAME = "Project V-CLos";
const SITE_DESCRIPTION = "洗足学園音楽大学 3DCGライブ制作団体 V-CLos 公式サイト。音楽-3DCG-テクノロジーの融合による次世代のエンターテイメントを追求します。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["V-CLos", "洗足学園音楽大学", "3DCGライブ", "バーチャルライブ", "Voca-Fes"],

  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/ogp.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/ogp.jpg"],
    creator: "@Project_V_CLos",
  },

  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
      </head>
      <body className={`${inter.className} ${notojp.variable} bg-black`}>

        <Script id="adobe-fonts" strategy="afterInteractive">
          {`
            (function(d) {
              var config = {
                kitId: 'alx8fbs',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `}
        </Script>

        <SmoothScroll />
        <HeaderLogo />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}