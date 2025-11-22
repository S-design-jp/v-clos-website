import type { Metadata } from "next";
import { Inter, Jura, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll"; // 追加

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
        <SmoothScroll /> {/* ここに配置 */}
        <Navigation />
        {children}
      </body>
    </html>
  );
}