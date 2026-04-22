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
export interface GalleryImageInput {
    title: string;
    description?: string;
    imageUrl: string;
    isVisible: boolean;
    category: GalleryCategory;
}
export interface ProfileInput {
    name: string;
    email: string;
    phone: string;
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
export interface EnrollmentAdminView {
    studentPrincipal: string;
    coursePrice: bigint;
    enrollment: Enrollment;
    courseName: string;
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
export interface Bookmark {
    id: string;
    itemId: string;
    userId: Principal;
    createdAt: Timestamp;
    itemType: ItemType;
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
export interface AdminStudentView {
    completedEnrollmentsCount: bigint;
    profile: StudentProfile;
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
export interface MaterialInput {
    title: string;
    description: string;
    fileSize?: string;
    fileType: FileType;
    courseId: bigint;
    fileUrl: string;
}
export interface BookmarkInput {
    itemId: string;
    itemType: ItemType;
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
export interface ProductInput {
    title: string;
    isAvailable: boolean;
    description: string;
    imageUrl: string;
    category: Category;
    price: number;
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
export interface NotificationInput {
    title: string;
    notificationType: NotificationType;
    message: string;
    targetUserId?: Principal;
}
export interface CouponInput {
    expiresAt?: Timestamp;
    value: number;
    code: string;
    discountType: DiscountType;
    isActive: boolean;
    maxUses: bigint;
}
export interface FeedbackInput {
    comment: string;
    rating: bigint;
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
export enum AnnouncementType {
    warning = "warning",
    info = "info",
    urgent = "urgent"
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
export enum NotificationType {
    announcement = "announcement",
    enrollment = "enrollment",
    general = "general",
    payment = "payment"
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
    confirmPayment(input: ConfirmPaymentInput): Promise<Enrollment | null>;
    createAnnouncement(input: AnnouncementInput): Promise<Announcement>;
    createCoupon(input: CouponInput): Promise<Coupon>;
    createCourse(input: CourseInput): Promise<Course>;
    createGalleryImage(input: GalleryImageInput): Promise<GalleryImage>;
    createNotification(input: NotificationInput): Promise<Array<Notification>>;
    createProduct(input: ProductInput): Promise<Product>;
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
    deleteGalleryImage(id: string): Promise<boolean>;
    deleteMaterial(id: bigint): Promise<boolean>;
    deleteProduct(id: bigint): Promise<boolean>;
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
    getAvailableCourses(): Promise<Array<Course>>;
    getCourseDetail(id: bigint): Promise<Course | null>;
    getCourses(): Promise<Array<Course>>;
    getEnquiries(): Promise<Array<Enquiry>>;
    getFeedback(): Promise<Array<Feedback>>;
    getFeedbackByCourse(courseId: string): Promise<Array<Feedback>>;
    getGalleryImages(category: GalleryCategory | null): Promise<Array<GalleryImage>>;
    getMaterialsForCourse(courseId: bigint): Promise<Array<StudyMaterial>>;
    getMyBookmarks(): Promise<Array<Bookmark>>;
    getMyEnrollments(): Promise<Array<Enrollment>>;
    getMyFeedback(): Promise<Array<Feedback>>;
    getMyMaterials(): Promise<Array<StudyMaterial>>;
    getMyNotifications(): Promise<Array<Notification>>;
    getMyVideosForCourse(courseId: string): Promise<{
        __kind__: "ok";
        ok: Array<Video>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getPreviewVideos(): Promise<Array<Video>>;
    getProductDetail(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getSiteSettings(): Promise<SiteSettings>;
    getStudentProfile(): Promise<StudentProfile | null>;
    getStudyMaterials(): Promise<Array<StudyMaterial>>;
    getTeacher(id: bigint): Promise<Teacher | null>;
    getTeachers(): Promise<Array<Teacher>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getVideos(): Promise<Array<Video>>;
    getVideosByCourse(courseId: string): Promise<Array<Video>>;
    isEnrolled(courseId: bigint): Promise<boolean>;
    markAllNotificationsRead(): Promise<bigint>;
    markNotificationRead(id: string): Promise<boolean>;
    purchaseCourse(input: PurchaseCourseInput): Promise<Enrollment>;
    removeBookmark(itemId: string): Promise<boolean>;
    submitEnquiry(input: EnquiryInput): Promise<bigint>;
    submitFeedback(input: FeedbackInput): Promise<Feedback>;
    toggleAnnouncementActive(id: string): Promise<Announcement | null>;
    toggleGalleryImageVisibility(id: string): Promise<GalleryImage | null>;
    toggleTestimonialVisibility(id: string): Promise<Testimonial | null>;
    updateAnnouncement(id: string, input: AnnouncementInput): Promise<Announcement | null>;
    updateCoupon(id: string, input: CouponInput): Promise<Coupon | null>;
    updateCourse(id: bigint, input: CourseInput): Promise<Course | null>;
    updateProduct(id: bigint, input: ProductInput): Promise<Product | null>;
    updateSiteSettings(settings: SiteSettings): Promise<SiteSettings>;
    updateStudentProfile(input: ProfileInput): Promise<void>;
    updateTeacher(id: bigint, input: TeacherInput): Promise<Teacher | null>;
    updateTestimonial(id: string, input: TestimonialInput): Promise<Testimonial | null>;
    uploadMaterial(input: MaterialInput): Promise<StudyMaterial>;
    validateCoupon(code: string): Promise<Coupon | null>;
}
