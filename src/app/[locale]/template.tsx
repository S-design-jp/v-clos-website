"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
const SHUTTER_DELAY = 0.5;
const SHUTTER_DURATION = 0.6;
const TOTAL_MS = (SHUTTER_DELAY + SHUTTER_DURATION) * 1000;

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setProgress(0);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        const startTime = Date.now();

        const tick = () => {
            const elapsed = Date.now() - startTime;
            const next = Math.min(100, Math.floor((elapsed / TOTAL_MS) * 100));
            setProgress(next);

            if (next < 100) {
                intervalRef.current = setTimeout(tick, 16);
            }
        };

        intervalRef.current = setTimeout(tick, 16);

        return () => {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
            }
        };
    }, [pathname]);

    return (
        <div className="relative">

            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: SHUTTER_DELAY + SHUTTER_DURATION, duration: 0.4 }}
            >
                {children}
            </motion.div>
            <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
                <motion.div
                    className="relative w-full bg-[#050505] border-b border-cyan-500/30 flex items-end justify-center overflow-hidden"
                    initial={{ height: "50vh" }}
                    animate={{ height: "0vh" }}
                    transition={{
                        duration: SHUTTER_DURATION,
                        ease: [0.76, 0, 0.24, 1],
                        delay: SHUTTER_DELAY,
                    }}
                >
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </motion.div>
                <motion.div
                    className="relative w-full bg-[#050505] border-t border-cyan-500/30 flex items-start justify-center overflow-hidden"
                    initial={{ height: "50vh" }}
                    animate={{ height: "0vh" }}
                    transition={{
                        duration: SHUTTER_DURATION,
                        ease: [0.76, 0, 0.24, 1],
                        delay: SHUTTER_DELAY,
                    }}
                >
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </motion.div>

                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{
                        duration: 0.2,
                        delay: SHUTTER_DELAY - 0.1,
                    }}
                >
                    <div className="flex flex-col items-center gap-2 w-64">
                        <div className="flex justify-between w-full text-cyan-400 font-jura text-xs tracking-widest">
                            <span>SYSTEM_LOAD</span>
                            <span>{progress}%</span>
                        </div>

                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>

                        <div className="text-[10px] text-gray-500 font-mono mt-1">
                            v-clos.sys.v2 // connecting...
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
