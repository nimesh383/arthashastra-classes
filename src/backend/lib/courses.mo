import List "mo:core/List";
import Time "mo:core/Time";
import CourseTypes "../types/courses";
import CommonTypes "../types/common";

module {
  public type Course = CourseTypes.Course;
  public type CourseInput = CourseTypes.CourseInput;

  // ── Existing / public API ──────────────────────────────────────────────────

  public func getCourses(courses : List.List<Course>) : [Course] {
    courses.filter(func(c) { not c.isDeleted }).toArray();
  };

  // ── Admin API ──────────────────────────────────────────────────────────────

  public func getAdminCourses(courses : List.List<Course>) : [Course] {
    courses.toArray();
  };

  public func createCourse(
    courses : List.List<Course>,
    nextId : Nat,
    input : CourseInput,
    now : CommonTypes.Timestamp,
  ) : Course {
    let course : Course = {
      id = nextId;
      title = input.title;
      subject = input.subject;
      level = input.level;
      description = input.description;
      price = input.price;
      duration = input.duration;
      teacherIds = input.teacherIds;
      imageUrl = input.imageUrl;
      createdAt = now;
      isDeleted = false;
      fees = input.price;
      instructor = "";
    };
    courses.add(course);
    course;
  };

  public func updateCourse(
    courses : List.List<Course>,
    id : Nat,
    input : CourseInput,
  ) : ?Course {
    var updated : ?Course = null;
    courses.mapInPlace(
      func(c) {
        if (c.id == id and not c.isDeleted) {
          let u : Course = {
            c with
            title = input.title;
            subject = input.subject;
            level = input.level;
            description = input.description;
            price = input.price;
            duration = input.duration;
            teacherIds = input.teacherIds;
            imageUrl = input.imageUrl;
            fees = input.price;
          };
          updated := ?u;
          u;
        } else c;
      }
    );
    updated;
  };

  public func deleteCourse(courses : List.List<Course>, id : Nat) : Bool {
    var found = false;
    courses.mapInPlace(
      func(c) {
        if (c.id == id and not c.isDeleted) {
          found := true;
          { c with isDeleted = true };
        } else c;
      }
    );
    found;
  };

  // ── Student API ────────────────────────────────────────────────────────────

  public func getAvailableCourses(courses : List.List<Course>) : [Course] {
    courses.filter(func(c) { not c.isDeleted }).toArray();
  };

  public func getCourseById(courses : List.List<Course>, id : Nat) : ?Course {
    courses.find(func(c) { c.id == id and not c.isDeleted });
  };

  // ── Legacy seed ────────────────────────────────────────────────────────────

  public func seedCourses(courses : List.List<Course>) {
    if (not courses.isEmpty()) return;
    let now = Time.now();
    let seed : [Course] = [
      {
        id = 1;
        title = "Class 11 Commerce Foundation";
        subject = #Commerce;
        level = #Class11;
        description = "Complete Class 11 Commerce curriculum covering Accountancy, Economics, and Business Studies.";
        price = 15000;
        duration = "12 months";
        teacherIds = [];
        imageUrl = null;
        createdAt = now;
        isDeleted = false;
        fees = 15000;
        instructor = "Ajay Govindani";
      },
      {
        id = 2;
        title = "Class 12 Commerce Mastery";
        subject = #Commerce;
        level = #Class12;
        description = "Intensive preparation for Class 12 Board Exams with full syllabus coverage.";
        price = 18000;
        duration = "12 months";
        teacherIds = [];
        imageUrl = null;
        createdAt = now;
        isDeleted = false;
        fees = 18000;
        instructor = "Ajay Govindani";
      },
      {
        id = 3;
        title = "Dropper Batch — Commerce Accelerator";
        subject = #Commerce;
        level = #Dropper;
        description = "Targeted revision and exam strategies for dropper students aiming for top scores.";
        price = 12000;
        duration = "6 months";
        teacherIds = [];
        imageUrl = null;
        createdAt = now;
        isDeleted = false;
        fees = 12000;
        instructor = "Ajay Govindani";
      },
    ];
    for (c in seed.values()) {
      courses.add(c);
    };
  };
};
