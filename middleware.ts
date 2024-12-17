import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {User} from '@/types/context/AuthContext';

export function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const isStaticAsset = pathname.startsWith('/_next/static') || pathname === '/favicon.ico';

    if (isStaticAsset) {
        return NextResponse.next();
    }
 
    const publicPathsRegex = /^\/(login|register|checkout)$/;

if (publicPathsRegex.test(pathname)) {
    return NextResponse.next();
}
    
    const rawCookie = request.cookies.get('auth_user')?.value;
    let user: User | undefined;
    if (!rawCookie) {
        console.log("No auth_user cookie found");
        user = undefined;
    } else {
    try {
        user = JSON.parse(rawCookie);
        console.log("Parsed user:", user);
    } catch (error) {
        console.error("Failed to parse auth_user cookie:", error);
        user = undefined;
    }
    }; 

    if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('reason', 'login_required');
        return NextResponse.redirect(loginUrl);
    };

    if (user.role !== 0 && pathname.startsWith('/superAdmin')) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('reason', 'unauthorized');
        return NextResponse.redirect(loginUrl);
    };
    
    console.log("pathname", pathname);
    const splittedPath = pathname.split('/');
    const dynamicUserName = splittedPath[1] == 'superAdmin' ? splittedPath[2]: splittedPath[1];
       
    if (dynamicUserName && dynamicUserName !== user?.userName) {
      
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('reason', 'account_mismatch');
        return NextResponse.redirect(loginUrl);
    };
    
    return NextResponse.next();
}