import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // We can't access localStorage in edge runtime middleware,
  // But we can check for a cookie if we set one, or just let the client side redirect.
  // For now, this is a placeholder if we decide to use cookies.
  
  // Since we are using localStorage in this implementation, client-side protection
  // will handle the redirects via AuthContext.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
