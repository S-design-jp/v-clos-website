"use client";

import Link from "next/link";
import Image from "next/image"; // Imageコンポーネントを追加

export default function HeaderLogo() {
    return (
        <Link
            href="/"
            className="fixed top-8 left-8 z-[100] group cursor-pointer mix-blend-difference" // 親要素で反転を指定
            aria-label="Back to Top"
        >
            <div className="flex flex-col leading-none">

                {/* === ロゴ画像 === */}
                <div className="relative w-32 h-auto transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src="/logo.png" // publicフォルダのパス
                        alt="V-CLos"
                        width={128}     // 画像の実際の幅に合わせて調整してください
                        height={40}     // 画像の実際の高さに合わせて調整してください
                        priority        // 重要な画像なので優先読み込み
                        className="object-contain w-full h-auto"
                    />
                </div>

                {/* サブテキスト（装飾） */}
                <span className="mt-1 text-[8px] font-jura text-gray-400 tracking-[0.2em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    HOME
                </span>
            </div>
        </Link>
    );
}