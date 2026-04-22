module {
  public type StudentProfile = {
    userId : Principal;
    name : Text;
    email : Text;
    phone : Text;
    enrolledCourses : [Nat];
    completedTests : [Nat];
  };

  public type AdminStudentView = {
    profile : StudentProfile;
    completedEnrollmentsCount : Nat;
  };
};
