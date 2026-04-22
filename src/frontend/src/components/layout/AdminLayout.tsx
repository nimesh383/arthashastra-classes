import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/store/authStore";
import {
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  CreditCard,
  FileText,
  GraduationCap,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PlayCircle,
  Settings,
  Star,
  Tag,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Teachers", href: "/admin/teachers", icon: GraduationCap },
  { label: "Materials", href: "/admin/materials", icon: FileText },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Videos", href: "/admin/videos", icon: PlayCircle },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Announcements", href: "/admin/announcements", icon: Bell },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Coupons", href: "/admin/coupons", icon: Tag },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const { role, logout } = useAuth();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    navigate({ to: "/" });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 pt-6 pb-5 border-b border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-[0_0_20px_oklch(0.68_0.24_200/0.4)] shrink-0">
          <BookOpen className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-sm text-foreground truncate">
            Arthashastra
          </p>
          <p className="text-[10px] text-muted-foreground tracking-wide uppercase">
            Admin Portal
          </p>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-5 py-3">
        <span className="admin-badge badge-primary text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[oklch(var(--primary))] animate-pulse inline-block" />
          {role === "admin" ? "Administrator" : role}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pb-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`admin-sidebar-nav text-sm font-medium ${
                isActive
                  ? "admin-sidebar-nav-active"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`admin.sidebar.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
              {isActive && (
                <motion.span
                  layoutId="admin-nav-indicator"
                  className="ml-auto w-1 h-4 rounded-full bg-[oklch(var(--primary))]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <Link
          to="/"
          className="admin-sidebar-nav text-sm text-muted-foreground hover:text-foreground mb-1"
          data-ocid="admin.sidebar.view_site.link"
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          View Site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="admin-sidebar-nav w-full text-sm text-muted-foreground hover:text-destructive"
          data-ocid="admin.sidebar.logout.button"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground dark flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 glass-morphism border-r border-white/10 sticky top-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 z-50 h-full w-64 bg-[oklch(0.16_0.07_260)] border-r border-white/10 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              data-ocid="admin.mobile_sidebar"
            >
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-smooth"
                aria-label="Close sidebar"
                data-ocid="admin.sidebar.close_button"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 h-14 bg-[oklch(0.16_0.07_260)] border-b border-white/10">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-smooth"
            aria-label="Open sidebar"
            data-ocid="admin.mobile_topbar.menu.button"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-bold text-sm gradient-text-cyan-violet">
              Admin Portal
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <ProtectedRoute requiredRole="admin" fallbackPath="/">
            <Outlet />
          </ProtectedRoute>
        </main>
      </div>
    </div>
  );
}
