import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import FeedbackTypes "../types/feedback";
import FeedbackLib "../lib/feedback";
import EnrollmentTypes "../types/enrollments";

mixin (
  feedbacks : List.List<FeedbackLib.Feedback>,
  enrollments : List.List<EnrollmentTypes.Enrollment>,
) {
  var nextFeedbackId : Nat = 1;

  public shared ({ caller }) func submitFeedback(input : FeedbackTypes.FeedbackInput) : async FeedbackTypes.Feedback {
    if (caller.isAnonymous()) Runtime.trap("Must be logged in");
    // Verify student is enrolled in the course (courseId is Text, enrollment.courseId is Nat)
    let isEnrolled = switch (input.courseId.toNat()) {
      case (?cid) {
        enrollments.any(func(e) {
          Principal.equal(e.studentId, caller) and
          e.courseId == cid and
          e.status == #Completed
        });
      };
      case null false;
    };
    if (not isEnrolled) Runtime.trap("Not enrolled in this course");
    let id = "fb" # nextFeedbackId.toText();
    nextFeedbackId += 1;
    FeedbackLib.submitFeedback(feedbacks, id, caller, input, Time.now());
  };

  public shared query ({ caller }) func getMyFeedback() : async [FeedbackTypes.Feedback] {
    if (caller.isAnonymous()) Runtime.trap("Must be logged in");
    FeedbackLib.getMyFeedback(feedbacks, caller);
  };

  public query ({ caller }) func getFeedback() : async [FeedbackTypes.Feedback] {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    FeedbackLib.getAllFeedback(feedbacks);
  };

  public query ({ caller }) func getFeedbackByCourse(courseId : Text) : async [FeedbackTypes.Feedback] {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    FeedbackLib.getFeedbackByCourse(feedbacks, courseId);
  };
};
