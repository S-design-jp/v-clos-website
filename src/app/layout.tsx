import type { Metadata } from "next";
import { Inter, Jura, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import HeaderLogo from "@/components/HeaderLogo";
import Footer from "@/components/Footer"; // ★追加: Footerをインポート

const inter = Inter({ subsets: ["latin"] });

const jura = Jura({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jura",
});

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
      <body className={`${inter.className} ${jura.variable} ${notojp.variable} bg-black`}>
        <SmoothScroll />

        {/* 固定ヘッダー類 */}
        <HeaderLogo />
        <Navigation />

        {/* ページごとの中身 */}
        {children}

        {/* ★追加: 全ページ共通フッター */}
        <Footer />
      </body>
    </html>
  );
}