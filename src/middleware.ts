import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/types/database.types';
import routes from '@/lib/routes';

export async function middleware(req: NextRequest) {
  const reqHeaders = new Headers(req.headers);
  reqHeaders.set('x-url', req.nextUrl.pathname);
  reqHeaders.set('x-next', new URLSearchParams(req.nextUrl.pathname).toString());
  const res = NextResponse.next({
    request: {
      headers: reqHeaders,
    },
  });

  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    // TODO: create a logger that saves error logs to a database
    console.log(error);
    const redirectURL = req.nextUrl.clone();
    redirectURL.pathname = `${routes.auth}/error`;
    return NextResponse.redirect(redirectURL);
  }

  if (!session || !session.user) {
    const redirectURL = req.nextUrl.clone();
    redirectURL.pathname = routes.auth;
    redirectURL.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(redirectURL);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - resources
     * - auth
     */
    '/((?!api|_next/static|_next/image|auth|resources|favicon.ico).*)',
  ],
};
