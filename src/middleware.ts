import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const auth = req.cookies.get('test-token')

    {/* Prevent to sign up page */}
    if (auth && req.url.includes('/signup')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    {/* Prevent to user list page */}
    if (!auth && !req.url.includes('/signup')) {
        return NextResponse.redirect(new URL('/signup', req.url))
    }
}

export const config = {
    matcher: ['/', '/signup/:path*'],
}