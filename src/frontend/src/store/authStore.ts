import type { UserRole } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";

// ─── Role derivation ──────────────────────────────────────────────────────────
const ADMIN_PRINCIPAL = import.meta.env.VITE_ADMIN_PRINCIPAL ?? "";
const TEACHER_PRINCIPAL = import.meta.env.VITE_TEACHER_PRINCIPAL ?? "";

export function deriveRole(principalText: string): UserRole {
  if (ADMIN_PRINCIPAL && principalText === ADMIN_PRINCIPAL) return "admin";
  if (TEACHER_PRINCIPAL && principalText === TEACHER_PRINCIPAL)
    return "teacher";
  // Support comma-separated list of teacher principals
  if (TEACHER_PRINCIPAL) {
    const teachers = TEACHER_PRINCIPAL.split(",").map((p: string) => p.trim());
    if (teachers.includes(principalText)) return "teacher";
  }
  return "student";
}

// ─── Auth hook ────────────────────────────────────────────────────────────────
/**
 * Central auth hook — wraps Internet Identity.
 * Returns: { isAuthenticated, isLoading, principalId, role, identity, login, logout, hasProfile }
 *
 * - login()      → triggers Internet Identity modal
 * - logout()     → calls II clear(); callers should handle toast + navigation
 * - hasProfile   → pass the result of useStudentProfile() as the optional arg
 *                  to derive this flag (profile data lives in React Query)
 *
 * Roles:
 * - admin   → principal matches VITE_ADMIN_PRINCIPAL
 * - teacher → principal matches VITE_TEACHER_PRINCIPAL (comma-separated for multi-teacher)
 * - student → any other authenticated user
 * - guest   → unauthenticated
 *
 * Session hydrates automatically from II on mount (no manual persistence needed).
 */
export function useAuth(profileOpt?: { name: string } | null) {
  const {
    identity,
    isAuthenticated,
    isLoggingIn,
    isInitializing,
    login,
    clear,
  } = useInternetIdentity();

  const isLoading = isLoggingIn || isInitializing;
  const principalId =
    isAuthenticated && identity ? identity.getPrincipal().toText() : null;
  const role: UserRole = principalId ? deriveRole(principalId) : "guest";

  // logout: callers show the toast and navigate — clear() ends the II session
  const logout = clear;

  // hasProfile — true when a student profile exists in the backend.
  // Pass the result of useStudentProfile() as the optional profileOpt arg
  // to get an accurate flag; without it defaults to undefined (unknown).
  const hasProfile: boolean | undefined =
    profileOpt !== undefined ? Boolean(profileOpt) : undefined;

  return {
    identity,
    principalId,
    role,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasProfile,
  };
}
