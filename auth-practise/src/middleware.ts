import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
    const token = request.cookies.get("token")?.value || '';
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';

    // You have token and try to acessing login or sigup
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl));
    }

    // Trying to access any other URL without token will throw to login
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl));
    }


}
 
// See "Matching Paths" below to learn more
// Route applying middleware
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/:path*'
  ],
}