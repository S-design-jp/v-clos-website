import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const currentDomain = 'v-clos.jp';

    const isProductionVercelDomain =
        hostname === 'v-clos.vercel.app' ||
        hostname === 'v-clos-git-main.vercel.app';

    if (isProductionVercelDomain) {
        const url = request.nextUrl.clone();
        url.hostname = currentDomain;
        url.protocol = 'https';
        return NextResponse.redirect(url, 301);
    }

    return intlProxy(request);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};