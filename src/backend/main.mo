import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import CourseTypes "types/courses";
import MaterialTypes "types/materials";
import StudentTypes "types/students";
import TeacherTypes "types/teachers";
import EnrollmentTypes "types/enrollments";
import ProductTypes "types/products";
import VideoTypes "types/videos";
import TestimonialTypes "types/testimonials";
import AnnouncementTypes "types/announcements";
import CouponTypes "types/coupons";
import GalleryTypes "types/gallery";
import FeedbackTypes "types/feedback";
import BookmarkTypes "types/bookmarks";
import NotificationTypes "types/notifications";
import TestTypes "types/tests";
import EventTypes "types/events";
import DownloadTypes "types/downloads";
import AiChatTypes "types/aichat";
import EnquiriesLib "lib/enquiries";
import CoursesLib "lib/courses";
import MaterialsLib "lib/materials";
import ProductsLib "lib/products";
import VideosLib "lib/videos";
import TestimonialsLib "lib/testimonials";
import AnnouncementsLib "lib/announcements";
import TestsLib "lib/tests";
import QuestionsLib "lib/questions";
import EventsLib "lib/events";
import DownloadsLib "lib/downloads";
import AiChatLib "lib/aichat";
import CoursesApi "mixins/courses-api";
import MaterialsApi "mixins/materials-api";
import TeachersApi "mixins/teachers-api";
import EnrollmentsApi "mixins/enrollments-api";
import EnquiriesApi "mixins/enquiries-api";
import StudentsApi "mixins/students-api";
import ProductsApi "mixins/products-api";
import VideosApi "mixins/videos-api";
import TestimonialsApi "mixins/testimonials-api";
import AnnouncementsApi "mixins/announcements-api";
import SiteSettingsApi "mixins/sitesettings-api";
import CouponsApi "mixins/coupons-api";
import GalleryApi "mixins/gallery-api";
import FeedbackApi "mixins/feedback-api";
import BookmarksApi "mixins/bookmarks-api";
import NotificationsApi "mixins/notifications-api";
import QuestionsApi "mixins/questions-api";
import TestAttemptsApi "mixins/testAttempts-api";
import EventsApi "mixins/events-api";
import DownloadsApi "mixins/downloads-api";
import AiChatApi "mixins/aichat-api";



actor {
  // ── Existing state ────────────────────────────────────────────────────────
  let courses = List.empty<CourseTypes.Course>();
  let studyMaterials = List.empty<MaterialTypes.StudyMaterial>();
  let teachers = List.empty<TeacherTypes.Teacher>();
  let enrollments = List.empty<EnrollmentTypes.Enrollment>();
  let enquiries = List.empty<EnquiriesLib.Enquiry>();
  let studentProfiles = Map.empty<Principal, StudentTypes.StudentProfile>();
  let products = List.empty<ProductTypes.Product>();
  let videos = List.empty<VideoTypes.Video>();
  let testimonials = List.empty<TestimonialTypes.Testimonial>();
  let announcements = List.empty<AnnouncementTypes.Announcement>();
  let coupons = List.empty<CouponTypes.Coupon>();
  let galleryImages = List.empty<GalleryTypes.GalleryImage>();
  let feedbacks = List.empty<FeedbackTypes.Feedback>();
  let bookmarks = List.empty<BookmarkTypes.Bookmark>();
  let notifications = List.empty<NotificationTypes.Notification>();

  // ── Test series (legacy) ──────────────────────────────────────────────────
  let tests = List.empty<TestsLib.TestSeries>();
  let legacyTestAttempts = Map.empty<(Principal, Nat), Nat>();

  // ── New test system state ─────────────────────────────────────────────────
  let questions = List.empty<QuestionsLib.Question>();
  let testAttempts = List.empty<TestTypes.TestAttempt>();
  let attemptAnswers = List.empty<TestTypes.TestAttemptAnswer>();
  let testResults = List.empty<TestTypes.TestResult>();

  // ── Events state ──────────────────────────────────────────────────────────
  let events = List.empty<EventsLib.Event>();
  let eventRegistrations = List.empty<EventsLib.EventRegistration>();

  // ── Downloads state ───────────────────────────────────────────────────────
  let downloadItems = List.empty<DownloadsLib.DownloadItem>();

  // ── AI Chat state ─────────────────────────────────────────────────────────
  let chatMessages = List.empty<AiChatLib.ChatMessage>();
  let chatSessions = List.empty<AiChatLib.ChatSession>();

  // ── Seed sample data once at deploy time ──────────────────────────────────
  do {
    CoursesLib.seedCourses(courses);
    MaterialsLib.seedMaterials(studyMaterials, Time.now());
    ProductsLib.seedProducts(products);
    VideosLib.seedVideos(videos, Principal.fromText("aaaaa-aa"), Time.now());
    TestimonialsLib.seedTestimonials(testimonials, Time.now());
    AnnouncementsLib.seedAnnouncements(announcements, Time.now());
    TestsLib.seedTests(tests);
    QuestionsLib.seedQuestions(questions);
    EventsLib.seedEvents(events);
    DownloadsLib.seedDownloadItems(downloadItems);
  };

  // ── Existing mixins ───────────────────────────────────────────────────────
  include CoursesApi(courses);
  include MaterialsApi(studyMaterials, enrollments);
  include TeachersApi(teachers);
  include EnrollmentsApi(enrollments, courses, studentProfiles);
  include EnquiriesApi(enquiries);
  include StudentsApi(studentProfiles);
  include ProductsApi(products);
  include VideosApi(videos, enrollments);
  include TestimonialsApi(testimonials);
  include AnnouncementsApi(announcements);
  include SiteSettingsApi();
  include CouponsApi(coupons);
  include GalleryApi(galleryImages);
  include FeedbackApi(feedbacks, enrollments);
  include BookmarksApi(bookmarks);
  include NotificationsApi(notifications, studentProfiles);

  // ── New domain mixins ─────────────────────────────────────────────────────
  include QuestionsApi(questions);
  include TestAttemptsApi(questions, testAttempts, attemptAnswers, testResults);
  include EventsApi(events, eventRegistrations);
  include DownloadsApi(downloadItems);
  include AiChatApi(chatMessages, chatSessions);
};
