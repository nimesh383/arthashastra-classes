import AdminLayout from "@/components/layout/AdminLayout";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import CookieBanner from "@/components/ui/CookieBanner";
import CustomCursor from "@/components/ui/CustomCursor";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import MobileCTABar from "@/components/ui/MobileCTABar";
import NotFound from "@/components/ui/NotFound";
import PageTransition from "@/components/ui/PageTransition";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

// ─── Lazy-loaded public pages ──────────────────────────────────────────────────
const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const CoursesPage = lazy(() => import("@/pages/Courses"));
const CourseDetailPage = lazy(() => import("@/pages/CourseDetail"));
const StudyMaterialsPage = lazy(() => import("@/pages/StudyMaterials"));
const TestsPage = lazy(() => import("@/pages/Tests"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const LoginPage = lazy(() => import("@/pages/Login"));
const SignupPage = lazy(() => import("@/pages/Signup"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const BlogPage = lazy(() => import("@/pages/Blog"));
const CareersPage = lazy(() => import("@/pages/Careers"));
const FreeKnowledgePage = lazy(() => import("@/pages/FreeKnowledge"));
const ComparisonPage = lazy(() => import("@/pages/Comparison"));
const StorePage = lazy(() => import("@/pages/Store"));
const TutorialsPage = lazy(() => import("@/pages/Tutorials"));
const GalleryPage = lazy(() => import("@/pages/Gallery"));
const FacultyDetailPage = lazy(() => import("@/pages/FacultyDetail"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsPage = lazy(() => import("@/pages/Terms"));
const RefundPolicyPage = lazy(() => import("@/pages/RefundPolicy"));
const SuccessStoriesPage = lazy(() => import("@/pages/SuccessStories"));

// ─── Lazy-loaded admin pages ───────────────────────────────────────────────────
const AdminOverviewPage = lazy(() => import("@/pages/admin/AdminOverview"));
const AdminCoursesPage = lazy(() => import("@/pages/admin/AdminCourses"));
const AdminTeachersPage = lazy(() => import("@/pages/admin/AdminTeachers"));
const AdminMaterialsPage = lazy(() => import("@/pages/admin/AdminMaterials"));
const AdminStudentsPage = lazy(() => import("@/pages/admin/AdminStudents"));
const AdminPaymentsPage = lazy(() => import("@/pages/admin/AdminPayments"));
const AdminVideosPage = lazy(() => import("@/pages/admin/AdminVideos"));
const AdminTestimonialsPage = lazy(
  () => import("@/pages/admin/AdminTestimonials"),
);
const AdminAnnouncementsPage = lazy(
  () => import("@/pages/admin/AdminAnnouncements"),
);
const AdminSettingsPage = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminCouponsPage = lazy(() => import("@/pages/admin/AdminCoupons"));
const AdminGalleryPage = lazy(() => import("@/pages/admin/AdminGallery"));

// ─── Spinner fallback ─────────────────────────────────────────────────────────
const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
  </div>
);

// ─── Public root layout ───────────────────────────────────────────────────────
function PublicLayout() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col dark">
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <PageTransition routeKey={pathname}>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
      {/* Global floating elements */}
      <WhatsAppButton />
      <BackToTop />
      <CookieBanner />
      <ExitIntentPopup />
      <MobileCTABar />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.18 0.08 260)",
            border: "1px solid oklch(0.25 0.10 260)",
            color: "oklch(0.92 0.02 260)",
          },
        }}
      />
    </div>
  );
}

// ─── Admin section wrapper ────────────────────────────────────────────────────
function AdminSection() {
  return (
    <div className="dark">
      <Suspense fallback={<Spinner />}>
        <AdminLayout />
      </Suspense>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.18 0.08 260)",
            border: "1px solid oklch(0.25 0.10 260)",
            color: "oklch(0.92 0.02 260)",
          },
        }}
      />
    </div>
  );
}

// ─── Root route ───────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// ─── Public layout route ──────────────────────────────────────────────────────
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: PublicLayout,
});

// ─── Admin layout route ───────────────────────────────────────────────────────
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminSection,
});

// ─── Public pages ─────────────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: HomePage,
});
const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/about",
  component: AboutPage,
});
const coursesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/courses",
  component: CoursesPage,
});
const courseDetailRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/courses/$id",
  component: CourseDetailPage,
});
const studyMaterialsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/study-materials",
  component: StudyMaterialsPage,
});
const testsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/tests",
  component: TestsPage,
});
const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/contact",
  component: ContactPage,
});
const loginRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/login",
  component: LoginPage,
});
const signupRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/signup",
  component: SignupPage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const blogRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/blog",
  component: BlogPage,
});
const careersRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/careers",
  component: CareersPage,
});
const freeKnowledgeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/free-knowledge",
  component: FreeKnowledgePage,
});
const comparisonRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/comparison",
  component: ComparisonPage,
});
const storeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/store",
  component: StorePage,
});
const tutorialsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/tutorials",
  component: TutorialsPage,
});
const galleryRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/gallery",
  component: GalleryPage,
});
const facultyDetailRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/faculty/$id",
  component: FacultyDetailPage,
});
const privacyPolicyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
});
const termsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/terms",
  component: TermsPage,
});
const refundPolicyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/refund",
  component: RefundPolicyPage,
});
const successStoriesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/success-stories",
  component: SuccessStoriesPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "*",
  component: NotFound,
});

// ─── Admin pages (children of admin layout) ───────────────────────────────────
const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: AdminOverviewPage,
});
const adminCoursesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/courses",
  component: AdminCoursesPage,
});
const adminTeachersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/teachers",
  component: AdminTeachersPage,
});
const adminMaterialsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/materials",
  component: AdminMaterialsPage,
});
const adminStudentsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/students",
  component: AdminStudentsPage,
});
const adminPaymentsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/payments",
  component: AdminPaymentsPage,
});
const adminVideosRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/videos",
  component: AdminVideosPage,
});
const adminTestimonialsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/testimonials",
  component: AdminTestimonialsPage,
});
const adminAnnouncementsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/announcements",
  component: AdminAnnouncementsPage,
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/settings",
  component: AdminSettingsPage,
});
const adminCouponsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/coupons",
  component: AdminCouponsPage,
});
const adminGalleryRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/gallery",
  component: AdminGalleryPage,
});

// ─── Route tree ───────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    indexRoute,
    aboutRoute,
    coursesRoute,
    courseDetailRoute,
    studyMaterialsRoute,
    testsRoute,
    contactRoute,
    loginRoute,
    signupRoute,
    dashboardRoute,
    blogRoute,
    careersRoute,
    freeKnowledgeRoute,
    comparisonRoute,
    storeRoute,
    tutorialsRoute,
    galleryRoute,
    facultyDetailRoute,
    privacyPolicyRoute,
    termsRoute,
    refundPolicyRoute,
    successStoriesRoute,
    notFoundRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminIndexRoute,
    adminCoursesRoute,
    adminTeachersRoute,
    adminMaterialsRoute,
    adminStudentsRoute,
    adminPaymentsRoute,
    adminVideosRoute,
    adminTestimonialsRoute,
    adminAnnouncementsRoute,
    adminSettingsRoute,
    adminCouponsRoute,
    adminGalleryRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
