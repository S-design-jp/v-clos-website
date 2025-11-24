"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollDimmer() {
    const [opacity, setOpacity] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") {
            setOpacity(0);
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const start = windowHeight * 0.3;
            const end = windowHeight * 0.8;

            let newOpacity = (scrollY - start) / (end - start);

            if (newOpacity < 0) newOpacity = 0;
            if (newOpacity > 0.85) newOpacity = 0.85;

            setOpacity(newOpacity);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    if (pathname !== "/") return null;

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black pointer-events-none transition-opacity duration-300 ease-out"
            style={{
                opacity: opacity,
                zIndex: 5
            }}
        />
    );
}