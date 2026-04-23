import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Video {
    id: string;
    title: string;
    thumbnailUrl: string;
    order: bigint;
    isPreview: boolean;
    createdAt: Timestamp;
    createdBy: Principal;
    description: string;
    videoUrl: string;
    courseId: string;
}
export interface Product {
    id: bigint;
    title: string;
    createdAt: Timestamp;
    isAvailable: boolean;
    description: string;
    imageUrl: string;
    category: Category;
    price: number;
}
export interface Testimonial {
    id: string;
    marks: string;
    studentName: string;
    subject: string;
    createdAt: Timestamp;
    text: string;
    photoUrl?: string;
    isVisible: boolean;
    rating: bigint;
    isVideo: boolean;
}
export interface TestAnalytics {
    avgScore: number;
    passRate: number;
    totalAttempts: bigint;
}
export interface Bookmark {
    id: string;
    itemId: string;
    userId: Principal;
    createdAt: Timestamp;
    itemType: ItemType;
}
export interface Feedback {
    id: string;
    studentId: Principal;
    createdAt: Timestamp;
    comment: string;
    rating: bigint;
    courseId: string;
}
export interface PurchaseCourseInput {
    amountPaid: bigint;
    paymentId: string;
    courseId: bigint;
}
export interface EventRegistration {
    id: bigint;
    eventId: bigint;
    studentId: string;
    name: string;
    email: string;
    phone: string;
    registeredAt: Timestamp;
}
export interface TestimonialInput {
    marks: string;
    studentName: string;
    subject: string;
    text: string;
    photoUrl?: string;
    isVisible: boolean;
    rating: bigint;
    isVideo: boolean;
}
export interface Teacher {
    id: bigint;
    isDeleted: boolean;
    name: string;
    email: string;
    specialization: string;
    profilePhotoUrl?: string;
}
export interface StudyMaterial {
    id: bigint;
    title: string;
    isDeleted: boolean;
    subject: Subject;
    description: string;
    fileSize?: string;
    fileType: FileType;
    courseId: bigint;
    uploadDate: Timestamp;
    materialType: MaterialType;
    uploadedAt: Timestamp;
    fileKey: string;
    fileUrl: string;
}
export interface ChatMessage {
    id: bigint;
    content: string;
    role: MessageRole;
    timestamp: Timestamp;
    sessionId: string;
}
export interface ProductInput {
    title: string;
    isAvailable: boolean;
    description: string;
    imageUrl: string;
    category: Category;
    price: number;
}
export interface Event {
    id: bigint;
    status: EventStatus;
    title: string;
    endDate: Timestamp;
    registeredCount: bigint;
    createdAt: Timestamp;
    description: string;
    imageUrl: string;
    topics: Array<string>;
    isVisible: boolean;
    capacity: bigint;
    speaker: string;
    eventDate: Timestamp;
}
export interface Enquiry {
    id: bigint;
    status: EnquiryStatus;
    name: string;
    email: string;
    message: string;
    timestamp: Timestamp;
    phone: string;
    course?: string;
}
export interface DownloadItemInput {
    title: string;
    subject: string;
    description: string;
    fileSize: string;
    category: DownloadCategory;
    isPublic: boolean;
    batchYear: string;
    fileUrl: string;
}
export interface SiteSettings {
    telegramUrl: string;
    heroText: string;
    instagramUrl: string;
    whatsappNumber: string;
    ctaText: string;
    contactEmail: string;
    youtubeUrl: string;
    linkedinUrl: string;
    contactAddress: string;
    heroSubtext: string;
    contactPhone: string;
}
export interface AnnouncementInput {
    title: string;
    expiresAt?: Timestamp;
    announcementType: AnnouncementType;
    isActive: boolean;
    message: string;
    isPinned: boolean;
}
export interface Notification {
    id: string;
    title: string;
    userId: Principal;
    notificationType: NotificationType;
    createdAt: Timestamp;
    isRead: boolean;
    message: string;
}
export interface CouponInput {
    expiresAt?: Timestamp;
    value: number;
    code: string;
    discountType: DiscountType;
    isActive: boolean;
    maxUses: bigint;
}
export interface GalleryImageInput {
    title: string;
    description?: string;
    imageUrl: string;
    isVisible: boolean;
    category: GalleryCategory;
}
export interface AdminStudentView {
    completedEnrollmentsCount: bigint;
    profile: StudentProfile;
}
export interface VideoInput {
    title: string;
    thumbnailUrl: string;
    order: bigint;
    isPreview: boolean;
    description: string;
    videoUrl: string;
    courseId: string;
}
export type Timestamp = bigint;
export interface EnrollmentAdminView {
    studentPrincipal: string;
    coursePrice: bigint;
    enrollment: Enrollment;
    courseName: string;
}
export interface TestAttemptAnswer {
    id: bigint;
    pointsAwarded: bigint;
    attemptId: bigint;
    studentAnswer: string;
    isCorrect: boolean;
    questionId: bigint;
}
export interface Enrollment {
    id: bigint;
    status: EnrollmentStatus;
    studentId: Principal;
    amountPaid: bigint;
    refundedAt?: Timestamp;
    purchasedAt: Timestamp;
    paymentId: string;
    courseId: bigint;
}
export interface TestAttempt {
    id: bigint;
    status: AttemptStatus;
    startedAt: Timestamp;
    studentId: string;
    submittedAt?: Timestamp;
    testId: bigint;
}
export interface MaterialInput {
    title: string;
    description: string;
    fileSize?: string;
    fileType: FileType;
    courseId: bigint;
    fileUrl: string;
}
export interface Course {
    id: bigint;
    title: string;
    duration: string;
    isDeleted: boolean;
    teacherIds: Array<bigint>;
    subject: Subject;
    instructor: string;
    fees: bigint;
    createdAt: Timestamp;
    description: string;
    level: Level;
    imageUrl?: string;
    price: bigint;
}
export interface BookmarkInput {
    itemId: string;
    itemType: ItemType;
}
export interface DownloadItem {
    id: bigint;
    title: string;
    subject: string;
    createdAt: Timestamp;
    description: string;
    fileSize: string;
    category: DownloadCategory;
    downloadCount: bigint;
    isPublic: boolean;
    batchYear: string;
    fileUrl: string;
}
export interface GalleryImage {
    id: string;
    title: string;
    createdAt: Timestamp;
    description?: string;
    imageUrl: string;
    isVisible: boolean;
    category: GalleryCategory;
}
export interface Announcement {
    id: string;
    title: string;
    expiresAt?: Timestamp;
    announcementType: AnnouncementType;
    createdAt: Timestamp;
    isActive: boolean;
    message: string;
    isPinned: boolean;
}
export interface ConfirmPaymentInput {
    enrollmentId: bigint;
    paymentId: string;
}
export interface TeacherInput {
    name: string;
    email: string;
    specialization: string;
    profilePhotoUrl?: string;
}
export interface EnquiryInput {
    name: string;
    email: string;
    message: string;
    phone: string;
    course?: string;
}
export interface Coupon {
    id: string;
    expiresAt?: Timestamp;
    value: number;
    code: string;
    createdAt: Timestamp;
    discountType: DiscountType;
    usedCount: bigint;
    isActive: boolean;
    maxUses: bigint;
}
export interface TestResult {
    id: bigint;
    studentId: string;
    attemptId: bigint;
    maxPoints: bigint;
    createdAt: Timestamp;
    grade: string;
    totalPoints: bigint;
    timeTaken: bigint;
    testId: bigint;
    percentage: number;
}
export interface CourseInput {
    title: string;
    duration: string;
    teacherIds: Array<bigint>;
    subject: Subject;
    description: string;
    level: Level;
    imageUrl?: string;
    price: bigint;
}
export interface StudentProfile {
    completedTests: Array<bigint>;
    userId: Principal;
    name: string;
    email: string;
    phone: string;
    enrolledCourses: Array<bigint>;
}
export interface EventInput {
    status: EventStatus;
    title: string;
    endDate: Timestamp;
    description: string;
    imageUrl: string;
    topics: Array<string>;
    isVisible: boolean;
    capacity: bigint;
    speaker: string;
    eventDate: Timestamp;
}
export interface NotificationInput {
    title: string;
    notificationType: NotificationType;
    message: string;
    targetUserId?: Principal;
}
export interface QuestionInput {
    explanation: string;
    text: string;
    correctAnswer: string;
    questionType: QuestionType;
    testId: bigint;
    options: Array<string>;
    orderIndex: bigint;
    points: bigint;
}
export interface Question {
    id: bigint;
    explanation: string;
    createdAt: Timestamp;
    text: string;
    correctAnswer: string;
    questionType: QuestionType;
    testId: bigint;
    options: Array<string>;
    orderIndex: bigint;
    points: bigint;
}
export interface EventRegistrationInput {
    eventId: bigint;
    name: string;
    email: string;
    phone: string;
}
export interface FeedbackInput {
    comment: string;
    rating: bigint;
    courseId: string;
}
export interface ProfileInput {
    name: string;
    email: string;
    phone: string;
}
export enum AnnouncementType {
    warning = "warning",
    info = "info",
    urgent = "urgent"
}
export enum AttemptStatus {
    submitted = "submitted",
    in_progress = "in_progress",
    timed_out = "timed_out"
}
export enum Category {
    Book = "Book",
    Notes = "Notes",
    DigitalResource = "DigitalResource",
    Merchandise = "Merchandise"
}
export enum DiscountType {
    flat = "flat",
    percent = "percent"
}
export enum DownloadCategory {
    admit_card = "admit_card",
    study_notes = "study_notes",
    certificate = "certificate",
    hall_ticket = "hall_ticket"
}
export enum EnquiryStatus {
    Contacted = "Contacted",
    Pending = "Pending"
}
export enum EnrollmentStatus {
    Failed = "Failed",
    Refunded = "Refunded",
    Completed = "Completed",
    Pending = "Pending"
}
export enum EventStatus {
    upcoming = "upcoming",
    cancelled = "cancelled",
    completed = "completed",
    ongoing = "ongoing"
}
export enum FileType {
    PDF = "PDF",
    Image = "Image"
}
export enum GalleryCategory {
    team = "team",
    results = "results",
    events = "events",
    classroom = "classroom"
}
export enum ItemType {
    video = "video",
    course = "course",
    material = "material"
}
export enum Level {
    Beginner = "Beginner",
    Advanced = "Advanced",
    Class11 = "Class11",
    Class12 = "Class12",
    Dropper = "Dropper",
    Intermediate = "Intermediate"
}
export enum MaterialType {
    PDF = "PDF",
    PYQ = "PYQ",
    Notes = "Notes"
}
export enum MessageRole {
    user = "user",
    assistant = "assistant"
}
export enum NotificationType {
    announcement = "announcement",
    enrollment = "enrollment",
    general = "general",
    payment = "payment"
}
export enum QuestionType {
    multiple_choice = "multiple_choice",
    essay = "essay"
}
export enum Subject {
    BST = "BST",
    Economics = "Economics",
    Accountancy = "Accountancy",
    Maths = "Maths",
    Commerce = "Commerce"
}
export interface backendInterface {
    addBookmark(input: BookmarkInput): Promise<Bookmark>;
    clearChatSession(sessionId: string): Promise<boolean>;
    confirmPayment(input: ConfirmPaymentInput): Promise<Enrollment | null>;
    createAnnouncement(input: AnnouncementInput): Promise<Announcement>;
    createCoupon(input: CouponInput): Promise<Coupon>;
    createCourse(input: CourseInput): Promise<Course>;
    createDownloadItem(input: DownloadItemInput): Promise<DownloadItem>;
    createEvent(input: EventInput): Promise<Event>;
    createGalleryImage(input: GalleryImageInput): Promise<GalleryImage>;
    createNotification(input: NotificationInput): Promise<Array<Notification>>;
    createProduct(input: ProductInput): Promise<Product>;
    createQuestion(input: QuestionInput): Promise<Question>;
    createTeacher(input: TeacherInput): Promise<Teacher>;
    createTestimonial(input: TestimonialInput): Promise<Testimonial>;
    createVideo(input: VideoInput): Promise<{
        __kind__: "ok";
        ok: Video;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteAnnouncement(id: string): Promise<boolean>;
    deleteCoupon(id: string): Promise<boolean>;
    deleteCourse(id: bigint): Promise<boolean>;
    deleteDownloadItem(id: bigint): Promise<boolean>;
    deleteEvent(id: bigint): Promise<boolean>;
    deleteGalleryImage(id: string): Promise<boolean>;
    deleteMaterial(id: bigint): Promise<boolean>;
    deleteProduct(id: bigint): Promise<boolean>;
    deleteQuestion(id: bigint): Promise<boolean>;
    deleteTeacher(id: bigint): Promise<boolean>;
    deleteTestimonial(id: string): Promise<boolean>;
    deleteVideo(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    enrollInCourse(courseId: bigint): Promise<boolean>;
    getActiveAnnouncements(): Promise<Array<Announcement>>;
    getAdminCoupons(): Promise<Array<Coupon>>;
    getAdminCourses(): Promise<Array<Course>>;
    getAdminPayments(): Promise<Array<EnrollmentAdminView>>;
    getAdminProducts(): Promise<Array<Product>>;
    getAdminStudents(): Promise<Array<AdminStudentView>>;
    getAdminTestAnalytics(testId: bigint): Promise<TestAnalytics>;
    getAttemptAnswers(attemptId: bigint): Promise<Array<TestAttemptAnswer>>;
    getAvailableCourses(): Promise<Array<Course>>;
    getChatHistory(sessionId: string): Promise<Array<ChatMessage>>;
    getCourseDetail(id: bigint): Promise<Course | null>;
    getCourses(): Promise<Array<Course>>;
    getDownloadItems(category: DownloadCategory | null): Promise<Array<DownloadItem>>;
    getEnquiries(): Promise<Array<Enquiry>>;
    getEventDetail(id: bigint): Promise<Event | null>;
    getEventRegistrations(eventId: bigint): Promise<Array<EventRegistration>>;
    getEvents(): Promise<Array<Event>>;
    getFeedback(): Promise<Array<Feedback>>;
    getFeedbackByCourse(courseId: string): Promise<Array<Feedback>>;
    getGalleryImages(category: GalleryCategory | null): Promise<Array<GalleryImage>>;
    getMaterialsForCourse(courseId: bigint): Promise<Array<StudyMaterial>>;
    getMyAttempts(testId: bigint | null): Promise<Array<TestAttempt>>;
    getMyBookmarks(): Promise<Array<Bookmark>>;
    getMyDownloads(category: DownloadCategory | null): Promise<Array<DownloadItem>>;
    getMyEnrollments(): Promise<Array<Enrollment>>;
    getMyFeedback(): Promise<Array<Feedback>>;
    getMyMaterials(): Promise<Array<StudyMaterial>>;
    getMyNotifications(): Promise<Array<Notification>>;
    getMyRegistrations(): Promise<Array<EventRegistration>>;
    getMyResults(): Promise<Array<TestResult>>;
    getMyVideosForCourse(courseId: string): Promise<{
        __kind__: "ok";
        ok: Array<Video>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getPastEvents(): Promise<Array<Event>>;
    getPreviewVideos(): Promise<Array<Video>>;
    getProductDetail(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getQuestionCount(testId: bigint): Promise<bigint>;
    getQuestionsByTest(testId: bigint): Promise<Array<Question>>;
    getSiteSettings(): Promise<SiteSettings>;
    getStudentProfile(): Promise<StudentProfile | null>;
    getStudyMaterials(): Promise<Array<StudyMaterial>>;
    getTeacher(id: bigint): Promise<Teacher | null>;
    getTeachers(): Promise<Array<Teacher>>;
    getTestLeaderboard(testId: bigint): Promise<Array<[string, number]>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUpcomingEvents(): Promise<Array<Event>>;
    getVideos(): Promise<Array<Video>>;
    getVideosByCourse(courseId: string): Promise<Array<Video>>;
    incrementDownloadCount(id: bigint): Promise<boolean>;
    isEnrolled(courseId: bigint): Promise<boolean>;
    markAllNotificationsRead(): Promise<bigint>;
    markNotificationRead(id: string): Promise<boolean>;
    purchaseCourse(input: PurchaseCourseInput): Promise<Enrollment>;
    registerForEvent(input: EventRegistrationInput): Promise<EventRegistration>;
    removeBookmark(itemId: string): Promise<boolean>;
    sendChatMessage(sessionId: string, message: string): Promise<string>;
    startAttempt(testId: bigint): Promise<TestAttempt>;
    submitAttempt(attemptId: bigint, answers: Array<[bigint, string]>): Promise<TestResult>;
    submitEnquiry(input: EnquiryInput): Promise<bigint>;
    submitFeedback(input: FeedbackInput): Promise<Feedback>;
    toggleAnnouncementActive(id: string): Promise<Announcement | null>;
    toggleGalleryImageVisibility(id: string): Promise<GalleryImage | null>;
    toggleTestimonialVisibility(id: string): Promise<Testimonial | null>;
    updateAnnouncement(id: string, input: AnnouncementInput): Promise<Announcement | null>;
    updateCoupon(id: string, input: CouponInput): Promise<Coupon | null>;
    updateCourse(id: bigint, input: CourseInput): Promise<Course | null>;
    updateDownloadItem(id: bigint, input: DownloadItemInput): Promise<DownloadItem | null>;
    updateEvent(id: bigint, input: EventInput): Promise<Event | null>;
    updateProduct(id: bigint, input: ProductInput): Promise<Product | null>;
    updateQuestion(id: bigint, input: QuestionInput): Promise<Question | null>;
    updateSiteSettings(settings: SiteSettings): Promise<SiteSettings>;
    updateStudentProfile(input: ProfileInput): Promise<void>;
    updateTeacher(id: bigint, input: TeacherInput): Promise<Teacher | null>;
    updateTestimonial(id: string, input: TestimonialInput): Promise<Testimonial | null>;
    uploadMaterial(input: MaterialInput): Promise<StudyMaterial>;
    validateCoupon(code: string): Promise<Coupon | null>;
}
