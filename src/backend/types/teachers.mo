module {
  public type Teacher = {
    id : Nat;
    name : Text;
    email : Text;
    specialization : Text;
    profilePhotoUrl : ?Text;
    isDeleted : Bool;
  };

  public type TeacherInput = {
    name : Text;
    email : Text;
    specialization : Text;
    profilePhotoUrl : ?Text;
  };
};
