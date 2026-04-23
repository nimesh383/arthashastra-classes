// ─── Re-export enums and types from backend ───────────────────────────────────
export type {
  Announcement,
  AnnouncementInput,
  Bookmark,
  BookmarkInput,
  ChatMessage,
  Course,
  CourseInput,
  Coupon,
  CouponInput,
  DownloadItem,
  DownloadItemInput,
  Event,
  EventInput,
  EventRegistration,
  EventRegistrationInput,
  Feedback,
  FeedbackInput,
  GalleryImage,
  GalleryImageInput,
  Notification,
  NotificationInput,
  Question,
  QuestionInput,
  SiteSettings,
  StudyMaterial,
  MaterialInput,
  Enrollment,
  EnrollmentAdminView,
  StudentProfile,
  ConfirmPaymentInput,
  PurchaseCourseInput,
  ProfileInput,
  Enquiry,
  EnquiryInput,
  Teacher,
  TeacherInput,
  TestAnalytics,
  TestAttempt,
  TestAttemptAnswer,
  TestResult,
  Testimonial,
  TestimonialInput,
  Timestamp,
  Product,
  ProductInput,
  Video,
  VideoInput,
} from "@/backend.d";

export {
  AnnouncementType,
  AttemptStatus,
  Category,
  DiscountType,
  DownloadCategory,
  EnquiryStatus,
  EnrollmentStatus,
  EventStatus,
  FileType,
  GalleryCategory,
  ItemType,
  Level,
  MaterialType,
  MessageRole,
  NotificationType,
  QuestionType,
  Subject,
} from "@/backend";

// ─── App-level role & auth types ─────────────────────────────────────────────
export type UserRole = "admin" | "teacher" | "student" | "guest";

export interface AuthUser {
  principalId: string;
  role: UserRole;
  displayName?: string;
}

// ─── Admin views ─────────────────────────────────────────────────────────────
export interface AdminStudentView {
  userId: string;
  name: string;
  email: string;
  enrollmentCount: number;
  enrolledCourses: bigint[];
}

export interface AdminPaymentView {
  enrollmentId: bigint;
  studentPrincipal: string;
  courseName: string;
  coursePrice: bigint;
  amountPaid: bigint;
  status: import("@/backend.d").EnrollmentStatus;
  purchasedAt: bigint;
  paymentId: string;
}

// ─── Misc UI types ────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export interface CareerOpening {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
}
