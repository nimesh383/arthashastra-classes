import CommonTypes "common";

module {
  public type EventStatus = {
    #upcoming;
    #ongoing;
    #completed;
    #cancelled;
  };

  public type Event = {
    id : Nat;
    title : Text;
    description : Text;
    eventDate : CommonTypes.Timestamp;
    endDate : CommonTypes.Timestamp;
    imageUrl : Text;
    speaker : Text;
    topics : [Text];
    capacity : Nat;
    registeredCount : Nat;
    status : EventStatus;
    isVisible : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type EventInput = {
    title : Text;
    description : Text;
    eventDate : CommonTypes.Timestamp;
    endDate : CommonTypes.Timestamp;
    imageUrl : Text;
    speaker : Text;
    topics : [Text];
    capacity : Nat;
    status : EventStatus;
    isVisible : Bool;
  };

  public type EventRegistration = {
    id : Nat;
    eventId : Nat;
    studentId : Text;
    name : Text;
    email : Text;
    phone : Text;
    registeredAt : CommonTypes.Timestamp;
  };

  public type EventRegistrationInput = {
    eventId : Nat;
    name : Text;
    email : Text;
    phone : Text;
  };
};
