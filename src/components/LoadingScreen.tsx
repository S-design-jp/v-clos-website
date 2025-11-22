"use client";

interface Props {
    progress: number; // 親から数値を受け取る
    isFading: boolean; // フェードアウト中かどうか
}

export default function LoadingScreen({ progress, isFading }: Props) {
    return (
        // z-index: 40 (ロゴより奥、3Dより手前)
        <div
            className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ease-out ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            {/* カウンター (右下) */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-6xl font-jura font-light text-white tabular-nums">
                        {progress}
                    </span>
                    <span className="text-sm font-jura text-cyan-400">%</span>
                </div>

                {/* プログレスバー */}
                <div className="w-32 h-[1px] bg-white/20 mt-2 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-cyan-400 transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <span className="text-[10px] font-jura text-gray-500 mt-1 tracking-widest">
                    INITIALIZING SYSTEM...
                </span>
            </div>
        </div>
    );
}