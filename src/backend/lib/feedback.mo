import List "mo:core/List";
import Principal "mo:core/Principal";
import FeedbackTypes "../types/feedback";
import CommonTypes "../types/common";

module {
  public type Feedback = FeedbackTypes.Feedback;
  public type FeedbackInput = FeedbackTypes.FeedbackInput;

  public func submitFeedback(
    feedbacks : List.List<Feedback>,
    id : Text,
    studentId : Principal,
    input : FeedbackInput,
    now : CommonTypes.Timestamp,
  ) : Feedback {
    let f : Feedback = {
      id;
      studentId;
      courseId = input.courseId;
      rating = input.rating;
      comment = input.comment;
      createdAt = now;
    };
    feedbacks.add(f);
    f;
  };

  public func getMyFeedback(
    feedbacks : List.List<Feedback>,
    studentId : Principal,
  ) : [Feedback] {
    feedbacks.filter(func(f) { Principal.equal(f.studentId, studentId) }).toArray();
  };

  public func getAllFeedback(feedbacks : List.List<Feedback>) : [Feedback] {
    feedbacks.toArray();
  };

  public func getFeedbackByCourse(
    feedbacks : List.List<Feedback>,
    courseId : Text,
  ) : [Feedback] {
    feedbacks.filter(func(f) { f.courseId == courseId }).toArray();
  };
};
