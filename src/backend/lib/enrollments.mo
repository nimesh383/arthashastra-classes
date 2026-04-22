import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import EnrollmentTypes "../types/enrollments";
import CommonTypes "../types/common";

module {
  public type Enrollment = EnrollmentTypes.Enrollment;
  public type PurchaseCourseInput = EnrollmentTypes.PurchaseCourseInput;
  public type ConfirmPaymentInput = EnrollmentTypes.ConfirmPaymentInput;
  public type EnrollmentAdminView = EnrollmentTypes.EnrollmentAdminView;

  // ── Student API ────────────────────────────────────────────────────────────

  public func purchaseCourse(
    enrollments : List.List<Enrollment>,
    nextId : Nat,
    studentId : Principal,
    input : PurchaseCourseInput,
    now : CommonTypes.Timestamp,
  ) : Enrollment {
    let enrollment : Enrollment = {
      id = nextId;
      studentId;
      courseId = input.courseId;
      paymentId = input.paymentId;
      status = #Pending;
      amountPaid = input.amountPaid;
      purchasedAt = now;
      refundedAt = null;
    };
    enrollments.add(enrollment);
    enrollment;
  };

  public func confirmPayment(
    enrollments : List.List<Enrollment>,
    studentId : Principal,
    input : ConfirmPaymentInput,
    _now : CommonTypes.Timestamp,
  ) : ?Enrollment {
    var updated : ?Enrollment = null;
    enrollments.mapInPlace(
      func(e) {
        if (
          e.id == input.enrollmentId and
          Principal.equal(e.studentId, studentId) and
          e.paymentId == input.paymentId and
          e.status == #Pending
        ) {
          let u : Enrollment = { e with status = #Completed };
          updated := ?u;
          u;
        } else e;
      }
    );
    updated;
  };

  public func getMyEnrollments(
    enrollments : List.List<Enrollment>,
    studentId : Principal,
  ) : [Enrollment] {
    enrollments.filter(func(e) { Principal.equal(e.studentId, studentId) }).toArray();
  };

  public func isEnrolled(
    enrollments : List.List<Enrollment>,
    studentId : Principal,
    courseId : Nat,
  ) : Bool {
    switch (
      enrollments.find(func(e) {
        Principal.equal(e.studentId, studentId) and
        e.courseId == courseId and
        e.status == #Completed;
      })
    ) {
      case (?_) true;
      case null false;
    };
  };

  public func getEnrolledCourseIds(
    enrollments : List.List<Enrollment>,
    studentId : Principal,
  ) : [Nat] {
    enrollments
      .filter(func(e) {
        Principal.equal(e.studentId, studentId) and e.status == #Completed;
      })
      .map<Enrollment, Nat>(func(e) { e.courseId })
      .toArray();
  };

  // ── Admin API ──────────────────────────────────────────────────────────────

  public func getAdminPayments(enrollments : List.List<Enrollment>) : [Enrollment] {
    enrollments.toArray();
  };

  public func countCompletedEnrollments(
    enrollments : List.List<Enrollment>,
    studentId : Principal,
  ) : Nat {
    enrollments.foldLeft<Nat, Enrollment>(
      0,
      func(acc, e) {
        if (Principal.equal(e.studentId, studentId) and e.status == #Completed) {
          acc + 1;
        } else acc;
      },
    );
  };
};
