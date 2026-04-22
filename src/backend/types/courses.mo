import CommonTypes "common";

module {
  public type Subject = {
    #Commerce;
    #Accountancy;
    #Economics;
    #BST;
    #Maths;
  };

  public type Level = {
    #Beginner;
    #Intermediate;
    #Advanced;
    #Class11;
    #Class12;
    #Dropper;
  };

  public type Course = {
    id : Nat;
    title : Text;
    subject : Subject;
    level : Level;
    description : Text;
    price : Nat;
    duration : Text;
    teacherIds : [Nat];
    imageUrl : ?Text;
    createdAt : CommonTypes.Timestamp;
    isDeleted : Bool;

    // Legacy fields kept for backward compatibility
    fees : Nat;
    instructor : Text;
  };

  public type CourseInput = {
    title : Text;
    subject : Subject;
    level : Level;
    description : Text;
    price : Nat;
    duration : Text;
    teacherIds : [Nat];
    imageUrl : ?Text;
  };
};
