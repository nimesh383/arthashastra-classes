import CommonTypes "common";

module {
  public type EnrollmentStatus = {
    #Pending;
    #Completed;
    #Failed;
    #Refunded;
  };

  public type Enrollment = {
    id : Nat;
    studentId : Principal;
    courseId : Nat;
    paymentId : Text;
    status : EnrollmentStatus;
    amountPaid : Nat;
    purchasedAt : CommonTypes.Timestamp;
    refundedAt : ?CommonTypes.Timestamp;
  };

  public type PurchaseCourseInput = {
    courseId : Nat;
    paymentId : Text;
    amountPaid : Nat;
  };

  public type ConfirmPaymentInput = {
    enrollmentId : Nat;
    paymentId : Text;
  };

  // Admin-facing view enriched with student and course names
  public type EnrollmentAdminView = {
    enrollment : Enrollment;
    studentPrincipal : Text;
    courseName : Text;
    coursePrice : Nat;
  };
};
