import { createActor } from "@/backend";
import type {
  AnnouncementInput,
  BookmarkInput,
  ConfirmPaymentInput,
  CouponInput,
  CourseInput,
  FeedbackInput,
  GalleryCategory,
  GalleryImageInput,
  MaterialInput,
  NotificationInput,
  PurchaseCourseInput,
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
