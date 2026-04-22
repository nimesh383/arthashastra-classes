import CommonTypes "common";

module {
  public type Feedback = {
    id : Text;
    studentId : Principal;
    courseId : Text;
    rating : Nat;
    comment : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type FeedbackInput = {
    courseId : Text;
    rating : Nat;
    comment : Text;
  };
};
