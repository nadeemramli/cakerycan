import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Database } from "database";

// Define public routes that don't need auth
const publicRoutes = ['/login'];

// Define static paths that should bypass auth
const staticPaths = ['/_next', '/favicon.ico'];

const isPublicPath = (pathname: string) =>
  publicRoutes.includes(pathname) ||
  staticPaths.some(path => pathname.startsWith(path));

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip auth check for public routes and static files
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Create a response to modify its headers
  const res = NextResponse.next();

  try {
    // Initialize Supabase client with both request and response
    const supabase = createMiddlewareClient<Database>({ 
      req: request, 
      res 
    });

    // Get the user directly instead of session for better security
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      // Clear any existing session
      await supabase.auth.signOut();
      // If at root path, redirect to login
      const redirectUrl = new URL('/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // For root path, redirect to dashboard if authenticated
    if (pathname === '/') {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Check for navigation state in cookies
    const cookies = request.cookies;
    const navState = cookies.get('auth_navigation');
    
    // Skip admin verification for recent navigations
    if (pathname === '/dashboard' && navState?.value) {
      try {
        const { timestamp } = JSON.parse(navState.value);
        if (Date.now() - timestamp < 5000) {
          return res;
        }
      } catch (e) {
        console.error('Error parsing navigation state:', e);
      }
    }

    // Verify admin status
    const { data: verifyData, error: verifyError } = await supabase.rpc(
      "verify_admin_status",
      { user_id: user.id }
    );

    if (verifyError || !verifyData?.is_admin) {
      // Sign out and redirect to login if not admin
      await supabase.auth.signOut();
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(redirectUrl);
    }

    // User is authenticated and is an admin
    return res;
  } catch (error) {
    console.error("[Middleware] Error:", error);
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('error', 'server_error');
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 