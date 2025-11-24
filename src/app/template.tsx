"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            // 修正: relative z-10 を追加して、ScrollDimmer(z-5) より手前に表示させる
            className="relative z-10"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}