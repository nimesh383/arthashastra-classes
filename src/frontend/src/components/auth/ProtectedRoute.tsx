import { useAuth } from "@/store/authStore";
import type { UserRole } from "@/types";
import { Navigate, useRouterState } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { type ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  /** Required role(s) to access. Omit to require any authenticated user. */
  requiredRole?: UserRole | UserRole[];
  /** Where to redirect when authenticated but wrong role. Default: /dashboard */
  fallbackPath?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  fallbackPath = "/dashboard",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Show cinematic loading indicator while II session is initialising
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background"
        data-ocid="auth.loading_state"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-[0_0_30px_oklch(0.68_0.24_200/0.4)] animate-pulse">
          <BookOpen className="w-7 h-7 text-white" />
        </div>
        <p className="text-muted-foreground text-sm font-medium tracking-wide">
          Verifying your identity…
        </p>
      </div>
    );
  }

  // Not authenticated → redirect to login with returnTo param via native navigation
  // (avoids TanStack Router typed-route constraint on dynamic strings)
  if (!isAuthenticated) {
    const returnTo = encodeURIComponent(currentPath);
    window.location.replace(`/login?returnTo=${returnTo}`);
    return null;
  }

  // Role check — if admin-only and user is not admin, redirect to fallback
  if (requiredRole) {
    const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowed.includes(role)) {
      return <Navigate to={fallbackPath as never} />;
    }
  }

  return <>{children}</>;
}
