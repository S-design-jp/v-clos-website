import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import HeaderLogo from "@/components/HeaderLogo";
import Footer from "@/components/Footer";
import { GlobalProvider } from "@/context/GlobalContext";
import AppBackground from "@/components/AppBackground";

const inter = Inter({ subsets: ["latin"] });
const notojp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://v-clos.com"),

  title: {
    template: "%s | V-CLos",
    default: "V-CLos | Virtual-Connect Live of synthesis",
  },
  description: "洗足学園音楽大学 3DCGライブ制作団体 V-CLos（ブイクロス）の公式サイトです。生演奏とモーションキャプチャを融合させた次世代のライブエンターテインメントを創造します。",
  verification: {
    google: "JvC-MoaOKYvPls4XTWFBu0-uvoO4f2zcMmovQY82jPM",
  },
  openGraph: {
    title: "V-CLos Official Website",
    description: "洗足学園音楽大学 3DCGライブ制作団体 V-CLosの公式サイト。",
    url: "https://v-clos.com",
    siteName: "V-CLos",
    locale: "ja_JP",
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
    description: "洗足学園音楽大学 V-CLos 公式サイト",
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
        {/* Adobe Fonts Script */}
        <Script id="adobe-fonts" strategy="afterInteractive">
          {`
            (function(d) {
              var config = { kitId: 'alx8fbs', scriptTimeout: 3000, async: true },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `}
        </Script>
      </head>
      <body className={`${inter.className} ${notojp.variable} bg-black`}>
        <GlobalProvider>

          {/* 2. ここを修正: Suspenseで囲む */}
          {/* fallback={null} は「読み込み中は何も表示しない」という意味 */}
          <Suspense fallback={null}>
            <SmoothScroll />
          </Suspense>

          <AppBackground />
          <HeaderLogo />
          <Navigation />
          {children}
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}