import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      const loginUrl = new URL('/admin', req.url);
      loginUrl.searchParams.set('redirect', req.nextUrl.pathname + req.nextUrl.search);      
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
