import { useAuth } from "@/store/authStore";
import { Link, useRouterState } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  GripHorizontal,
  House,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PRIMARY_ITEMS = [
  { label: "Home", href: "/", Icon: House },
  { label: "Courses", href: "/courses", Icon: BookOpen },
  { label: "Tests", href: "/tests", Icon: ClipboardList },
  { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  { label: "Menu", href: null, Icon: Menu },
] as const;

const EXTRA_LINKS = [
  { label: "Study Materials", href: "/study-materials" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Downloads", href: "/downloads" },
  { label: "Events", href: "/events" },
  { label: "Store", href: "/store" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Comparison", href: "/comparison" },
  { label: "Blog", href: "/blog" },
];

export default function MobileBottomNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const portalHref =
    role === "admin" || role === "teacher" ? "/admin" : "/dashboard";
  const portalLabel =
    role === "admin"
      ? "Admin Portal"
      : role === "teacher"
        ? "Teacher Portal"
        : "Dashboard";
  const PortalIcon = role === "admin" ? Settings : LayoutDashboard;

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully.");
    navigate({ to: "/" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Bottom sheet overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed bottom-14 left-0 right-0 z-50 md:hidden rounded-t-2xl overflow-hidden"
              style={{
                background: "oklch(0.14 0.07 260)",
                borderTop: "1px solid oklch(0.68 0.24 200 / 0.25)",
                boxShadow: "0 -8px 40px oklch(0.68 0.24 200 / 0.15)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              data-ocid="mobile_nav.sheet"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ borderColor: "oklch(0.25 0.1 260)" }}
              >
                <span className="text-sm font-semibold gradient-text-cyan-violet">
                  More Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg transition-smooth hover:bg-white/10 text-muted-foreground"
                  data-ocid="mobile_nav.close_button"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid of extra links */}
              <div className="grid grid-cols-3 gap-px p-4 max-h-64 overflow-y-auto">
                {EXTRA_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-center py-3 px-2 rounded-xl text-xs font-medium text-center transition-smooth ${
                      pathname === link.href
                        ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                    }`}
                    data-ocid={`mobile_nav.extra.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Auth actions */}
              <div
                className="flex flex-col gap-2 px-4 py-3 border-t"
                style={{
                  borderColor: "oklch(0.25 0.1 260)",
                  paddingBottom: "env(safe-area-inset-bottom, 12px)",
                }}
              >
                {isAuthenticated ? (
                  <div className="flex gap-2">
                    <a
                      href={portalHref}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 transition-smooth"
                      onClick={() => setMenuOpen(false)}
                      data-ocid="mobile_nav.portal.link"
                    >
                      <PortalIcon className="w-4 h-4" />
                      {portalLabel}
                    </a>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 transition-smooth"
                      data-ocid="mobile_nav.logout.button"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 text-white transition-smooth"
                    data-ocid="mobile_nav.login.button"
                  >
                    <LogIn className="w-4 h-4" />
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom bar — mobile only */}
      <motion.nav
        className="mobile-nav-bar"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        data-ocid="mobile_nav.bar"
      >
        <div className="mobile-nav-grid">
          {PRIMARY_ITEMS.map(({ label, href, Icon }) => {
            const isActive = href ? pathname === href : menuOpen;

            if (href === null) {
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className={`mobile-nav-item ${isActive ? "mobile-nav-item-active" : "mobile-nav-item-inactive"}`}
                  aria-label="Open menu"
                  data-ocid="mobile_nav.menu_button"
                >
                  <span className="relative">
                    {menuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <GripHorizontal className="w-5 h-5" />
                    )}
                  </span>
                  <span style={{ fontSize: "10px" }}>{label}</span>
                </button>
              );
            }

            return (
              <Link
                key={label}
                to={href}
                className={`mobile-nav-item ${isActive ? "mobile-nav-item-active" : "mobile-nav-item-inactive"}`}
                data-ocid={`mobile_nav.${label.toLowerCase()}.link`}
              >
                <span className="relative">
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                    />
                  )}
                </span>
                <span style={{ fontSize: "10px" }}>{label}</span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
