import CommonTypes "common";

module {
  public type Testimonial = {
    id : Text;
    studentName : Text;
    rating : Nat;
    text : Text;
    marks : Text;
    subject : Text;
    photoUrl : ?Text;
    isVideo : Bool;
    isVisible : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type TestimonialInput = {
    studentName : Text;
    rating : Nat;
    text : Text;
    marks : Text;
    subject : Text;
    photoUrl : ?Text;
    isVideo : Bool;
    isVisible : Bool;
  };
};
