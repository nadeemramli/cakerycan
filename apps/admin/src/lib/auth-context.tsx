"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "database";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

function debugLog(area: string, message: string, data?: any) {
  console.log(`[Auth/${area}] ${message}`, data ? data : "");
}

function debugError(area: string, message: string, error: any) {
  console.error(`[Auth/${area}] ${message}:`, error);
  if (error?.message)
    console.error(`[Auth/${area}] Error message:`, error.message);
  if (error?.cause) console.error(`[Auth/${area}] Error cause:`, error.cause);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClientComponentClient<Database>();

  // Helper function to verify admin status with retries
  const verifyAdminStatus = useCallback(
    async (userId: string, retries = MAX_RETRIES): Promise<boolean> => {
      debugLog(
        "verifyAdmin",
        `Verifying admin status for user ${userId}, attempts left: ${retries}`
      );
      try {
        const { data: verifyData, error: verifyError } = await supabase.rpc(
          "verify_admin_status",
          { user_id: userId }
        );

        if (verifyError) throw verifyError;

        debugLog("verifyAdmin", `Admin status result:`, verifyData?.is_admin);
        return verifyData?.is_admin ?? false;
      } catch (error) {
        debugError("verifyAdmin", "Verification error", error);
        if (retries > 0) {
          debugLog("verifyAdmin", `Retrying after ${RETRY_DELAY}ms...`);
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          return verifyAdminStatus(userId, retries - 1);
        }
        throw error;
      }
    },
    [supabase]
  );

  const safeNavigate = useCallback(
    async (path: string) => {
      if (isNavigating) {
        debugLog(
          "navigation",
          `Navigation to ${path} skipped - already navigating`
        );
        return;
      }

      try {
        setIsNavigating(true);
        debugLog("navigation", `Navigating to ${path}`);

        // Store navigation state in sessionStorage
        sessionStorage.setItem(
          "auth_navigation",
          JSON.stringify({
            from: pathname,
            to: path,
            timestamp: Date.now(),
          })
        );

        // Use replace instead of push to prevent back button issues
        router.replace(path);
      } catch (error) {
        debugError("navigation", "Navigation failed", error);
      } finally {
        setIsNavigating(false);
      }
    },
    [router, pathname, isNavigating]
  );

  const checkUser = useCallback(
    async (mounted: boolean) => {
      debugLog("checkUser", "Starting user check");
      try {
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (!mounted) {
          debugLog("checkUser", "Component unmounted during check");
          return;
        }

        if (userError) throw userError;

        if (currentUser) {
          debugLog("checkUser", "User found", currentUser);
          setUser(currentUser);

          const isAdminUser = await verifyAdminStatus(currentUser.id);

          if (!mounted) return;

          setIsAdmin(isAdminUser);
          debugLog(
            "checkUser",
            `Admin status: ${isAdminUser}, current path: ${pathname}`
          );

          if (isAdminUser && pathname === "/login") {
            debugLog(
              "checkUser",
              "Admin on login page, redirecting to dashboard"
            );
            await safeNavigate("/dashboard");
          } else if (!isAdminUser && pathname !== "/login") {
            debugLog("checkUser", "Non-admin detected, signing out");
            await signOut();
          }
        } else {
          debugLog("checkUser", "No user found");
          setUser(null);
          setIsAdmin(false);
          if (pathname !== "/login") {
            await safeNavigate("/login");
          }
        }
      } catch (error) {
        debugError("checkUser", "Check user failed", error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        if (mounted) {
          setIsLoading(false);
          debugLog("checkUser", "Finished loading");
        }
      }
    },
    [supabase, pathname, verifyAdminStatus, safeNavigate]
  );

  useEffect(() => {
    let mounted = true;
    debugLog("init", `Initial mount, pathname: ${pathname}`);

    // Check for pending navigation
    const pendingNav = sessionStorage.getItem("auth_navigation");
    if (pendingNav) {
      const { to, timestamp } = JSON.parse(pendingNav);
      // Only process recent navigations (within last 5 seconds)
      if (Date.now() - timestamp < 5000 && pathname !== to) {
        safeNavigate(to);
      }
      sessionStorage.removeItem("auth_navigation");
    }

    checkUser(mounted);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      debugLog("authChange", `Auth state changed: ${event}`, {
        hasSession: !!session,
      });

      if (!mounted) {
        debugLog("authChange", "Component unmounted during auth change");
        return;
      }

      if (session?.user) {
        debugLog("authChange", "Session found, updating user");
        setUser(session.user);

        try {
          const isAdminUser = await verifyAdminStatus(session.user.id);

          if (!mounted) return;

          setIsAdmin(isAdminUser);
          debugLog("authChange", `Admin verification complete: ${isAdminUser}`);

          if (isAdminUser) {
            if (pathname === "/login") {
              debugLog("authChange", "Admin verified, redirecting from login");
              await safeNavigate("/dashboard");
            }
          } else {
            debugLog("authChange", "Non-admin user detected, signing out");
            await signOut();
          }
        } catch (error) {
          debugError("authChange", "Error during auth change handling", error);
          await signOut();
        }
      } else {
        debugLog("authChange", "No session, resetting state");
        setUser(null);
        setIsAdmin(false);
        if (pathname !== "/login") {
          await safeNavigate("/login");
        }
      }
    });

    return () => {
      debugLog("cleanup", "Unmounting auth provider");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, pathname, checkUser, verifyAdminStatus, safeNavigate]);

  const signIn = async (email: string, password: string) => {
    debugLog("signIn", "Starting sign in process");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      debugLog("signIn", "Sign in successful", { user: data.user?.id });

      // Wait for auth state change to handle the rest
      debugLog("signIn", "Waiting for auth state change to process");
    } catch (error) {
      debugError("signIn", "Sign in failed", error);
      throw error;
    }
  };

  const signOut = async () => {
    debugLog("signOut", "Starting sign out process");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      debugLog("signOut", "Sign out successful");
      setUser(null);
      setIsAdmin(false);
      await safeNavigate("/login");
    } catch (error) {
      debugError("signOut", "Sign out failed", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
