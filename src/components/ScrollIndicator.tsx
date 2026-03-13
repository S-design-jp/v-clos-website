"use client";

import { useState, useEffect } from "react";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`absolute bottom-[10vh] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-opacity duration-700 ease-out z-50 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div className="relative flex items-center justify-center">
        <svg
          className="w-14 h-14 text-[#4cd8ed] drop-shadow-[0_0_12px_rgba(76,216,237,0.7)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ animation: 'chevronScroll 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <style>{`
        @keyframes chevronScroll {
          0% { 
            transform: translateY(-20px); 
            opacity: 0; 
          }
          30% { 
            transform: translateY(0); 
            opacity: 1; 
          }
          70% { 
            transform: translateY(0); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(40px); /* 下部への移動距離を拡張 */
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
}