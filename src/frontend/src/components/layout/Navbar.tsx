import AnnouncementBanner from "@/components/ui/AnnouncementBanner";
import MagneticButton from "@/components/ui/MagneticButton";
import RippleButton from "@/components/ui/RippleButton";
import { useAuth } from "@/store/authStore";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const publicNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Comparison", href: "/comparison" },
  { label: "Study Materials", href: "/study-materials" },
  { label: "Downloads", href: "/downloads" },
  { label: "Tests", href: "/tests" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Store", href: "/store" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { isAuthenticated, isLoading, role, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setMobileOpen(false);
    }
  });

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    navigate({ to: "/" });
  };

  // Admin routes use a separate router, so use native hrefs instead of Link
  const portalHref =
    role === "admin" || role === "teacher" ? "/admin" : "/dashboard";
  const portalLabel =
    role === "admin"
      ? "Admin Portal"
      : role === "teacher"
        ? "Teacher Portal"
        : "Dashboard";
  const PortalIcon = role === "admin" ? Settings : LayoutDashboard;

  return (
    <>
      <AnnouncementBanner />
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,212,255,0.08)]"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="navbar.logo.link"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-smooth">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg gradient-text-cyan-violet hidden sm:block">
              Arthashastra Classes
            </span>
            <span className="font-display font-bold text-lg gradient-text-cyan-violet sm:hidden">
              AC
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-smooth relative group ${
                  pathname === link.href
                    ? "text-cyan-400"
                    : "text-foreground/70 hover:text-foreground"
                }`}
                data-ocid={`navbar.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-cyan-400"
                    layoutId="nav-indicator"
                  />
                )}
                <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-smooth" />
              </Link>
            ))}
            {role === "teacher" && (
              <a
                href="/admin"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-smooth relative group ${
                  pathname.startsWith("/admin")
                    ? "text-cyan-400"
                    : "text-foreground/70 hover:text-foreground"
                }`}
                data-ocid="navbar.teacher-portal.link"
              >
                Teacher Portal
                <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-smooth" />
              </a>
            )}
          </div>

          {/* CTA — auth-aware */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoading ? (
              <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            ) : isAuthenticated ? (
              <>
                <a
                  href={portalHref}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-cyan-400 hover:bg-cyan-500/10 transition-smooth"
                  data-ocid="navbar.portal.link"
                >
                  <PortalIcon className="w-3.5 h-3.5" />
                  {portalLabel}
                </a>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-red-400 hover:bg-red-500/10 transition-smooth"
                  data-ocid="navbar.logout.button"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-smooth px-3 py-2"
                  data-ocid="navbar.login.link"
                >
                  Login
                </Link>
                <MagneticButton>
                  <Link to="/login" data-ocid="navbar.signup.button">
                    <RippleButton className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold flex items-center gap-1 shadow-glow hover:shadow-glow-lg transition-smooth">
                      Get Started <ChevronRight className="w-3 h-3" />
                    </RippleButton>
                  </Link>
                </MagneticButton>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-white/10 transition-smooth"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="navbar.hamburger.button"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 z-50 h-full w-72 bg-[oklch(0.12_0.05_260)] border-l border-white/10 flex flex-col pt-20 pb-8 px-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              data-ocid="navbar.mobile_drawer"
            >
              <nav className="flex flex-col gap-1 flex-1">
                {publicNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-smooth ${
                      pathname === link.href
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                    }`}
                    data-ocid={`navbar.mobile.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  >
                    {link.label}
                  </Link>
                ))}

                {isAuthenticated && (
                  <a
                    href={portalHref}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20"
                    data-ocid="navbar.mobile.portal.link"
                  >
                    <PortalIcon className="w-4 h-4" />
                    {portalLabel}
                  </a>
                )}
              </nav>

              <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-center px-4 py-2 rounded-xl border border-red-500/30 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-smooth"
                    data-ocid="navbar.mobile.logout.button"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-center px-4 py-2 rounded-xl border border-white/20 text-sm font-medium text-foreground/70 hover:text-foreground hover:border-white/40 transition-smooth"
                      data-ocid="navbar.mobile.login.link"
                    >
                      Login
                    </Link>
                    <Link
                      to="/login"
                      className="text-center px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold shadow-glow"
                      data-ocid="navbar.mobile.signup.button"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
