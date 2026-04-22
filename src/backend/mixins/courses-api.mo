import List "mo:core/List";
import Time "mo:core/Time";
import CourseTypes "../types/courses";
import CoursesLib "../lib/courses";

mixin (courses : List.List<CoursesLib.Course>) {
  var nextCourseId : Nat = 1;

  // ── Backward-compatible public endpoint ───────────────────────────────────

  public query func getCourses() : async [CourseTypes.Course] {
    CoursesLib.getCourses(courses);
  };

  // ── Admin endpoints ────────────────────────────────────────────────────────

  public shared ({ caller }) func createCourse(input : CourseTypes.CourseInput) : async CourseTypes.Course {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    let course = CoursesLib.createCourse(courses, nextCourseId, input, Time.now());
    nextCourseId += 1;
    course;
  };

  public shared ({ caller }) func updateCourse(id : Nat, input : CourseTypes.CourseInput) : async ?CourseTypes.Course {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    CoursesLib.updateCourse(courses, id, input);
  };

  public shared ({ caller }) func deleteCourse(id : Nat) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    CoursesLib.deleteCourse(courses, id);
  };

  public query ({ caller }) func getAdminCourses() : async [CourseTypes.Course] {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    CoursesLib.getAdminCourses(courses);
  };

  // ── Student endpoints ──────────────────────────────────────────────────────

  public query func getAvailableCourses() : async [CourseTypes.Course] {
    CoursesLib.getAvailableCourses(courses);
  };

  public query func getCourseDetail(id : Nat) : async ?CourseTypes.Course {
    CoursesLib.getCourseById(courses, id);
  };
};
