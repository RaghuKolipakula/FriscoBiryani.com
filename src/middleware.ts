import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  if (url.pathname === '/auto-deals') {
    let variant = request.cookies.get('ab-variant')?.value;
    
    if (!variant || (variant !== 'variant-a' && variant !== 'variant-b')) {
      variant = Math.random() < 0.5 ? 'variant-a' : 'variant-b';
    }
    
    url.pathname = `/auto-deals/${variant}`;
    const response = NextResponse.rewrite(url);
    response.cookies.set('ab-variant', variant, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    return response;
  }
}

export const config = {
  matcher: '/auto-deals',
};
