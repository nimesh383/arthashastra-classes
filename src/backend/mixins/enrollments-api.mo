import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import EnrollmentTypes "../types/enrollments";
import EnrollmentsLib "../lib/enrollments";
import StudentTypes "../types/students";
import CourseTypes "../types/courses";

mixin (
  enrollments : List.List<EnrollmentsLib.Enrollment>,
  courses : List.List<CourseTypes.Course>,
  studentProfiles : Map.Map<Principal, StudentTypes.StudentProfile>,
) {
  var nextEnrollmentId : Nat = 1;

  // ── Student endpoints ──────────────────────────────────────────────────────

  public shared ({ caller }) func purchaseCourse(input : EnrollmentTypes.PurchaseCourseInput) : async EnrollmentTypes.Enrollment {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    let enrollment = EnrollmentsLib.purchaseCourse(enrollments, nextEnrollmentId, caller, input, Time.now());
    nextEnrollmentId += 1;
    enrollment;
  };

  public shared ({ caller }) func confirmPayment(input : EnrollmentTypes.ConfirmPaymentInput) : async ?EnrollmentTypes.Enrollment {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    EnrollmentsLib.confirmPayment(enrollments, caller, input, Time.now());
  };

  public shared query ({ caller }) func getMyEnrollments() : async [EnrollmentTypes.Enrollment] {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    EnrollmentsLib.getMyEnrollments(enrollments, caller);
  };

  public shared query ({ caller }) func isEnrolled(courseId : Nat) : async Bool {
    if (caller.isAnonymous()) return false;
    EnrollmentsLib.isEnrolled(enrollments, caller, courseId);
  };

  // ── Admin endpoints ────────────────────────────────────────────────────────

  public query ({ caller }) func getAdminPayments() : async [EnrollmentTypes.EnrollmentAdminView] {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    let allEnrollments = EnrollmentsLib.getAdminPayments(enrollments);
    allEnrollments.map<EnrollmentTypes.Enrollment, EnrollmentTypes.EnrollmentAdminView>(
      func(e) {
        let courseName = switch (courses.find(func(c : CourseTypes.Course) : Bool { c.id == e.courseId })) {
          case (?c) c.title;
          case null "Unknown Course";
        };
        let coursePrice = switch (courses.find(func(c : CourseTypes.Course) : Bool { c.id == e.courseId })) {
          case (?c) c.price;
          case null 0;
        };
        {
          enrollment = e;
          studentPrincipal = e.studentId.toText();
          courseName;
          coursePrice;
        };
      }
    );
  };

  public query ({ caller }) func getAdminStudents() : async [StudentTypes.AdminStudentView] {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    let profiles = studentProfiles.values();
    profiles.map<StudentTypes.StudentProfile, StudentTypes.AdminStudentView>(
      func(p) {
        {
          profile = p;
          completedEnrollmentsCount = EnrollmentsLib.countCompletedEnrollments(enrollments, p.userId);
        };
      }
    ).toArray();
  };
};
