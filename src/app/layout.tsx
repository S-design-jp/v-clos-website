import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script"; // ★追加: Scriptコンポーネントをインポート
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

export const metadata: Metadata = {
  title: "Project V-CLos",
  description: "Virtual / Visual / Vocal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* 以前の <link> タグは削除してください */}
      </head>
      <body className={`${inter.className} ${notojp.variable} bg-black`}>

        {/* Adobe Fonts読み込みスクリプト */}
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