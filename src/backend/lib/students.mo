import Map "mo:core/Map";
import StudentTypes "../types/students";

module {
  public type StudentProfile = StudentTypes.StudentProfile;
  public type ProfileInput = {
    name : Text;
    email : Text;
    phone : Text;
  };

  public func getStudentProfile(
    profiles : Map.Map<Principal, StudentProfile>,
    userId : Principal,
  ) : ?StudentProfile {
    profiles.get(userId);
  };

  public func updateStudentProfile(
    profiles : Map.Map<Principal, StudentProfile>,
    userId : Principal,
    input : ProfileInput,
  ) {
    let existing = profiles.get(userId);
    let updated : StudentProfile = switch (existing) {
      case (?p) {
        { p with name = input.name; email = input.email; phone = input.phone };
      };
      case null {
        {
          userId;
          name = input.name;
          email = input.email;
          phone = input.phone;
          enrolledCourses = [];
          completedTests = [];
        };
      };
    };
    profiles.add(userId, updated);
  };

  public func enrollInCourse(
    profiles : Map.Map<Principal, StudentProfile>,
    userId : Principal,
    courseId : Nat,
  ) : Bool {
    switch (profiles.get(userId)) {
      case null false;
      case (?p) {
        let alreadyEnrolled = p.enrolledCourses.find(func(id : Nat) : Bool { id == courseId });
        switch (alreadyEnrolled) {
          case (?_) true;
          case null {
            let newCourses = p.enrolledCourses.concat([courseId]);
            profiles.add(userId, { p with enrolledCourses = newCourses });
            true;
          };
        };
      };
    };
  };
};
