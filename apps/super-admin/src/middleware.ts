import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Edge runtime route protection skeleton.
  // Full protection is managed by the client-side AuthContext.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/schools/:path*', '/billing/:path*'],
};
