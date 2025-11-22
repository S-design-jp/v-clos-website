"use client";

export default function Footer() {
    return (
        <footer className="relative z-10 w-full bg-black py-20 border-t border-white/10 overflow-hidden">

            {/* 流れる文字を削除し、静的な巨大ロゴに変更 */}
            {/* 重くないのでパフォーマンスに影響しません */}
            <div className="w-full flex justify-center items-center pointer-events-none select-none">
                <h2 className="text-[15vw] font-bold font-jura text-white/5 leading-none tracking-tighter">
                    V-CLos
                </h2>
            </div>

            {/* 最下部情報 */}
            <div className="mt-12 px-6 flex flex-col md:flex-row justify-between items-end text-xs font-jura text-gray-600 gap-4">
                <div>
                    <p>© 2025 PROJECT V-CLos.</p>
                    <p>All Rights Reserved.</p>
                </div>
                <div className="flex gap-6">
                    <span className="hover:text-cyan-400 transition-colors cursor-pointer">PRIVACY POLICY</span>
                    <span className="hover:text-cyan-400 transition-colors cursor-pointer">CONTACT</span>
                </div>
            </div>

        </footer>
    );
}