import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';


const intlMiddleware = createMiddleware({
    locales: ['ja', 'en'],

    defaultLocale: 'ja',

    localePrefix: 'as-needed'
});

export default function middleware(request: NextRequest) {

    const hostname = request.headers.get('host') || '';
    const currentDomain = 'v-clos.jp';


    if (hostname.includes('vercel.app')) {
        const url = request.nextUrl.clone();
        url.hostname = currentDomain;
        url.protocol = 'https';
        return NextResponse.redirect(url, 301);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};