import { createActor } from "@/backend";
import type {
  AnnouncementInput,
  BookmarkInput,
  ConfirmPaymentInput,
  CouponInput,
  CourseInput,
  DownloadCategory,
  EventRegistrationInput,
  FeedbackInput,
  GalleryCategory,
  GalleryImageInput,
  MaterialInput,
  NotificationInput,
  PurchaseCourseInput,
  QuestionInput,
  SiteSettings,
  TeacherInput,
  TestimonialInput,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Helper ──────────────────────────────────────────────────────────────────
function useActorGuard() {
  const { actor, isFetching } = useActor(createActor);
  const enabled = !!actor && !isFetching;
  return { actor, enabled };
}

// ─── Courses ──────────────────────────────────────────────────────────────────
export function useCourses() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => actor!.getCourses(),
    enabled,
  });
}

export function useAvailableCourses() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["courses", "available"],
    queryFn: () => actor!.getAvailableCourses(),
    enabled,
  });
}

export function useAdminCourses() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["admin", "courses"],
    queryFn: () => actor!.getAdminCourses(),
    enabled,
  });
}

export function useCourseDetail(id: bigint | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["courses", id?.toString()],
    queryFn: () => actor!.getCourseDetail(id!),
    enabled: enabled && id !== null,
  });
}

export function useCreateCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CourseInput) => actor!.createCourse(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
      qc.invalidateQueries({ queryKey: ["admin", "courses"] });
    },
  });
}

export function useUpdateCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: bigint; input: CourseInput }) =>
      actor!.updateCourse(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
      qc.invalidateQueries({ queryKey: ["admin", "courses"] });
    },
  });
}

export function useDeleteCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteCourse(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
      qc.invalidateQueries({ queryKey: ["admin", "courses"] });
    },
  });
}

// ─── Teachers ─────────────────────────────────────────────────────────────────
export function useTeachers() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["teachers"],
    queryFn: () => actor!.getTeachers(),
    enabled,
  });
}

export function useTeacher(id: bigint | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["teachers", id?.toString()],
    queryFn: () => actor!.getTeacher(id!),
    enabled: enabled && id !== null,
  });
}

export function useCreateTeacher() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: TeacherInput) => actor!.createTeacher(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

export function useUpdateTeacher() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: bigint; input: TeacherInput }) =>
      actor!.updateTeacher(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

export function useDeleteTeacher() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteTeacher(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

// ─── Study Materials ──────────────────────────────────────────────────────────
export function useStudyMaterials() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["materials"],
    queryFn: () => actor!.getStudyMaterials(),
    enabled,
  });
}

export function useMyMaterials() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["materials", "mine"],
    queryFn: () => actor!.getMyMaterials(),
    enabled,
  });
}

export function useUploadMaterial() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: MaterialInput) => actor!.uploadMaterial(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["materials"] });
    },
  });
}

export function useDeleteMaterial() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteMaterial(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}

// ─── Enrollments & Payments ───────────────────────────────────────────────────
export function useMyEnrollments() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["enrollments", "mine"],
    queryFn: () => actor!.getMyEnrollments(),
    enabled,
  });
}

export function usePurchaseCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: PurchaseCourseInput) => actor!.purchaseCourse(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enrollments"] });
      qc.invalidateQueries({ queryKey: ["courses", "available"] });
    },
  });
}

export function useConfirmPayment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ConfirmPaymentInput) => actor!.confirmPayment(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["enrollments"] }),
  });
}

export function useAdminPayments() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["admin", "payments"],
    queryFn: () => actor!.getAdminPayments(),
    enabled,
  });
}

// ─── Students ─────────────────────────────────────────────────────────────────
export function useAdminStudents() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["admin", "students"],
    queryFn: () => actor!.getAdminStudents(),
    enabled,
  });
}

export function useStudentProfile() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => actor!.getStudentProfile(),
    enabled,
  });
}

// ─── Enquiries ────────────────────────────────────────────────────────────────
export function useEnquiries() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["enquiries"],
    queryFn: () => actor!.getEnquiries(),
    enabled,
  });
}

// ─── Products ─────────────────────────────────────────────────────────────────
export function useProducts() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["products"],
    queryFn: () => actor!.getProducts(),
    enabled,
  });
}

export function useAdminProducts() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => actor!.getAdminProducts(),
    enabled,
  });
}

// ─── Videos ───────────────────────────────────────────────────────────────────
export function useVideos() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["videos"],
    queryFn: () => actor!.getVideos(),
    enabled,
  });
}

export function useCreateVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: import("@/backend.d").VideoInput) => {
      const result = await actor!.createVideo(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useDeleteVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const result = await actor!.deleteVideo(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useVideosByCourse(courseId: string | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["videos", "byCourse", courseId],
    queryFn: () => actor!.getVideosByCourse(courseId!),
    enabled: enabled && courseId !== null,
  });
}

export function useMyVideosForCourse(courseId: string | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["videos", "mine", courseId],
    queryFn: async () => {
      const result = await actor!.getMyVideosForCourse(courseId!);
      if (result.__kind__ === "ok") return result.ok;
      return [] as import("@/backend.d").Video[];
    },
    enabled: enabled && courseId !== null,
  });
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export function useTestimonials() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => actor!.getTestimonials(),
    enabled,
  });
}

export function useCreateTestimonial() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: TestimonialInput) => actor!.createTestimonial(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: TestimonialInput }) =>
      actor!.updateTestimonial(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteTestimonial(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useToggleTestimonialVisibility() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.toggleTestimonialVisibility(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

// ─── Announcements ────────────────────────────────────────────────────────────
export function useActiveAnnouncements() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["announcements", "active"],
    queryFn: () => actor!.getActiveAnnouncements(),
    enabled,
  });
}

export function useCreateAnnouncement() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: AnnouncementInput) => actor!.createAnnouncement(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useUpdateAnnouncement() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: AnnouncementInput }) =>
      actor!.updateAnnouncement(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteAnnouncement(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useToggleAnnouncementActive() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.toggleAnnouncementActive(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

// ─── Site Settings ────────────────────────────────────────────────────────────
export function useSiteSettings() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: () => actor!.getSiteSettings(),
    enabled,
  });
}

export function useUpdateSiteSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (settings: SiteSettings) => actor!.updateSiteSettings(settings),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteSettings"] }),
  });
}

// ─── Coupons ──────────────────────────────────────────────────────────────────
export function useValidateCoupon(code: string | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["coupons", "validate", code],
    queryFn: () => actor!.validateCoupon(code!),
    enabled: enabled && code !== null && code.length > 0,
  });
}

export function useAdminCoupons() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["admin", "coupons"],
    queryFn: () => actor!.getAdminCoupons(),
    enabled,
  });
}

export function useCreateCoupon() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CouponInput) => actor!.createCoupon(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "coupons"] }),
  });
}

export function useUpdateCoupon() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CouponInput }) =>
      actor!.updateCoupon(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "coupons"] }),
  });
}

export function useDeleteCoupon() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteCoupon(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "coupons"] }),
  });
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export function useGalleryImages(category: GalleryCategory | null = null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["gallery", category],
    queryFn: () => actor!.getGalleryImages(category),
    enabled,
  });
}

export function useCreateGalleryImage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: GalleryImageInput) => actor!.createGalleryImage(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
}

export function useDeleteGalleryImage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteGalleryImage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
}

export function useToggleGalleryImageVisibility() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.toggleGalleryImageVisibility(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
}

// ─── Feedback ─────────────────────────────────────────────────────────────────
export function useSubmitFeedback() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: FeedbackInput) => actor!.submitFeedback(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feedback"] });
      qc.invalidateQueries({ queryKey: ["feedback", "mine"] });
    },
  });
}

export function useMyFeedback() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["feedback", "mine"],
    queryFn: () => actor!.getMyFeedback(),
    enabled,
  });
}

export function useAdminFeedback() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["feedback"],
    queryFn: () => actor!.getFeedback(),
    enabled,
  });
}

export function useFeedbackByCourse(courseId: string | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["feedback", "byCourse", courseId],
    queryFn: () => actor!.getFeedbackByCourse(courseId!),
    enabled: enabled && courseId !== null,
  });
}

// ─── Bookmarks ────────────────────────────────────────────────────────────────
export function useAddBookmark() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: BookmarkInput) => actor!.addBookmark(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] }),
  });
}

export function useRemoveBookmark() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => actor!.removeBookmark(itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] }),
  });
}

export function useMyBookmarks() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => actor!.getMyBookmarks(),
    enabled,
  });
}

// ─── Notifications ────────────────────────────────────────────────────────────
export function useMyNotifications() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => actor!.getMyNotifications(),
    enabled,
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.markNotificationRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkAllNotificationsRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => actor!.markAllNotificationsRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useCreateNotification() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: NotificationInput) => actor!.createNotification(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

// ─── Questions ────────────────────────────────────────────────────────────────
export function useQuestions(testId: bigint | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["questions", testId?.toString()],
    queryFn: () => actor!.getQuestionsByTest(testId!),
    enabled: enabled && testId !== null,
  });
}

export function useCreateQuestion() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: QuestionInput) => actor!.createQuestion(input),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["questions", variables.testId.toString()],
      });
    },
  });
}

export function useDeleteQuestion() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteQuestion(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["questions"] }),
  });
}

// ─── Test Attempts ────────────────────────────────────────────────────────────
export function useStartAttempt() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (testId: bigint) => actor!.startAttempt(testId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["attempts"] }),
  });
}

export function useSubmitAttempt() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      attemptId,
      answers,
    }: {
      attemptId: bigint;
      answers: Array<[bigint, string]>;
    }) => actor!.submitAttempt(attemptId, answers),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["attempts"] });
      qc.invalidateQueries({ queryKey: ["results"] });
      qc.invalidateQueries({
        queryKey: ["attemptAnswers", variables.attemptId.toString()],
      });
    },
  });
}

export function useMyAttempts(testId?: bigint) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["attempts", testId?.toString() ?? "all"],
    queryFn: () => actor!.getMyAttempts(testId ?? null),
    enabled,
  });
}

export function useMyResults() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["results"],
    queryFn: () => actor!.getMyResults(),
    enabled,
  });
}

export function useAttemptAnswers(attemptId: bigint | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["attemptAnswers", attemptId?.toString()],
    queryFn: () => actor!.getAttemptAnswers(attemptId!),
    enabled: enabled && attemptId !== null,
  });
}

export function useTestLeaderboard(testId: bigint | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["leaderboard", testId?.toString()],
    queryFn: () => actor!.getTestLeaderboard(testId!),
    enabled: enabled && testId !== null,
  });
}

export function useAdminTestAnalytics(testId: bigint | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["admin", "testAnalytics", testId?.toString()],
    queryFn: () => actor!.getAdminTestAnalytics(testId!),
    enabled: enabled && testId !== null,
  });
}

// ─── Events ───────────────────────────────────────────────────────────────────
export function useEvents() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["events"],
    queryFn: () => actor!.getEvents(),
    enabled,
  });
}

export function useUpcomingEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: () => actor!.getUpcomingEvents(),
    enabled: !!actor && !isFetching,
  });
}

export function usePastEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["events", "past"],
    queryFn: () => actor!.getPastEvents(),
    enabled: !!actor && !isFetching,
  });
}

export function useEventDetail(id: bigint | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["events", id?.toString()],
    queryFn: () => actor!.getEventDetail(id!),
    enabled: enabled && id !== null,
  });
}

export function useRegisterForEvent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: EventRegistrationInput) =>
      actor!.registerForEvent(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["eventRegistrations", "mine"] });
    },
  });
}

export function useMyEventRegistrations() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["eventRegistrations", "mine"],
    queryFn: () => actor!.getMyRegistrations(),
    enabled,
  });
}

export function useEventRegistrations(eventId: bigint | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["eventRegistrations", eventId?.toString()],
    queryFn: () => actor!.getEventRegistrations(eventId!),
    enabled: enabled && eventId !== null,
  });
}

// ─── Downloads ────────────────────────────────────────────────────────────────
export function useDownloadItems(category?: DownloadCategory | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["downloads", category ?? "all"],
    queryFn: () => actor!.getDownloadItems(category ?? null),
    enabled,
  });
}

export function useMyDownloads() {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["downloads", "mine"],
    queryFn: () => actor!.getMyDownloads(null),
    enabled,
  });
}

export function useIncrementDownload() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.incrementDownloadCount(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["downloads"] }),
  });
}

// ─── Chat ─────────────────────────────────────────────────────────────────────
export function useSendChatMessage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      sessionId,
      message,
    }: {
      sessionId: string;
      message: string;
    }) => actor!.sendChatMessage(sessionId, message),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["chat", variables.sessionId] });
    },
  });
}

export function useChatHistory(sessionId: string | null) {
  const { actor, enabled } = useActorGuard();
  return useQuery({
    queryKey: ["chat", sessionId],
    queryFn: () => actor!.getChatHistory(sessionId!),
    enabled: enabled && sessionId !== null && sessionId.length > 0,
  });
}

export function useClearChatSession() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => actor!.clearChatSession(sessionId),
    onSuccess: (_data, sessionId) => {
      qc.invalidateQueries({ queryKey: ["chat", sessionId] });
    },
  });
}
