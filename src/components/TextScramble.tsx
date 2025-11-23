"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "-_!@#$%^&*/<>[]{}|~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface Props {
    text: string;
    duration?: number;
    delay?: number;
    className?: string;
    start?: boolean; // アニメーション開始トリガーを追加
}

export default function TextScramble({ text, duration = 1000, delay = 0, className, start = true }: Props) {
    const [displayText, setDisplayText] = useState(text); // 初期値はtextにしておくが、opacityで隠す
    const [isStarted, setIsStarted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // startがfalseなら何もしない
        if (!start) return;

        const beginAnimation = () => {
            setIsStarted(true);
            let iteration = 0;

            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setDisplayText((prev) =>
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) return text[index];
                            if (char === " ") return " ";
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                iteration += 1 / (duration / 30 / text.length);

                if (iteration >= text.length) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setDisplayText(text);
                }
            }, 30);
        };

        const timer = setTimeout(beginAnimation, delay);

        return () => {
            clearTimeout(timer);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, duration, delay, start]);

    return (
        <span className={`${className} transition-opacity duration-300 ${start && isStarted ? "opacity-100" : "opacity-0"}`}>
            {displayText}
        </span>
    );
}