import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    const currentDomain = 'v-clos.jp';

    if (hostname.includes('vercel.app')) {
        return NextResponse.redirect(new URL(url.pathname, `https://${currentDomain}`), 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [

        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};