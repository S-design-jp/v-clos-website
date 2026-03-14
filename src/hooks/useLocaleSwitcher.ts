"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

/**
 * useLocaleSwitcher
 *
 * Navigation.tsx と LanguageSwitcher.tsx で重複していた
 * 言語切り替えロジックをカスタムフックとして一元管理する。
 *
 * 使い方:
 *   const { locale, switchLanguage, localizedHref } = useLocaleSwitcher();
 */
export function useLocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    /**
     * 指定ロケールに切り替える
     * - Cookie を更新して next-intl のロケール検出に反映
     * - /en プレフィックスを付け外しして router.push
     */
    const switchLanguage = (newLocale: string) => {
        if (locale === newLocale) return;

        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

        let newPath = pathname;
        if (newLocale === "en") {
            newPath = `/en${pathname === "/" ? "" : pathname}`;
        } else {
            newPath = pathname.replace(/^\/en/, "") || "/";
        }

        router.push(newPath);
        router.refresh();
    };

    /**
     * href にロケールプレフィックスを付与して返す
     * next-intl の localePrefix: "as-needed" に準拠:
     *   ja (defaultLocale) → プレフィックスなし
     *   en                 → /en/...
     */
    const localizedHref = (href: string): string => {
        const base = locale === "en" ? "/en" : "";
        return href === "/" ? `${base}/` : `${base}${href}`;
    };

    return { locale, switchLanguage, localizedHref };
}