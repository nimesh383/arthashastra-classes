import Map "mo:core/Map";
import StudentTypes "../types/students";
import StudentsLib "../lib/students";

mixin (studentProfiles : Map.Map<Principal, StudentTypes.StudentProfile>) {
  public shared query ({ caller }) func getStudentProfile() : async ?StudentTypes.StudentProfile {
    StudentsLib.getStudentProfile(studentProfiles, caller);
  };

  public shared ({ caller }) func updateStudentProfile(input : StudentsLib.ProfileInput) : async () {
    StudentsLib.updateStudentProfile(studentProfiles, caller, input);
  };

  public shared ({ caller }) func enrollInCourse(courseId : Nat) : async Bool {
    StudentsLib.enrollInCourse(studentProfiles, caller, courseId);
  };
};
