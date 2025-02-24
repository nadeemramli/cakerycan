import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    // Create a response to modify
    const res = NextResponse.next();

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req: request, res });

    // Refresh session if expired - this is key for maintaining the session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const path = request.nextUrl.pathname;

    // Debug session state with more details
    console.log("Middleware check:", { 
      path,
      hasSession: !!session,
      userId: session?.user?.id,
    });

    // Handle protected routes (dashboard)
    if (path.startsWith("/dashboard")) {
      if (!session) {
        console.log("No session, redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Check if user has admin role using verify_admin_status
      const { data: verifyData, error: verifyError } = await supabase.rpc(
        'verify_admin_status',
        { user_id: session.user.id }
      );

      if (verifyError || !verifyData?.is_admin) {
        console.log("Not an admin, redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Admin with valid session accessing dashboard - allow
      console.log("Admin access granted to dashboard");
      return res;
    }

    // Handle auth routes (login)
    if (path === "/login") {
      if (session) {
        // Check if user is admin before redirecting
        const { data: verifyData, error: verifyError } = await supabase.rpc(
          'verify_admin_status',
          { user_id: session.user.id }
        );

        if (!verifyError && verifyData?.is_admin) {
          console.log("Admin already logged in, redirecting to dashboard");
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
      // Not logged in or not admin - allow access to login page
      console.log("Allowing access to login page");
      return res;
    }

    // All other routes
    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    // Only redirect to login if not already on login page
    if (request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
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
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}; 