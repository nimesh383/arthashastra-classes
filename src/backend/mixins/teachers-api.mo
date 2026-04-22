import List "mo:core/List";
import TeacherTypes "../types/teachers";
import TeachersLib "../lib/teachers";

mixin (teachers : List.List<TeachersLib.Teacher>) {
  var nextTeacherId : Nat = 1;

  // ── Admin endpoints ────────────────────────────────────────────────────────

  public shared ({ caller }) func createTeacher(input : TeacherTypes.TeacherInput) : async TeacherTypes.Teacher {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    let teacher = TeachersLib.createTeacher(teachers, nextTeacherId, input);
    nextTeacherId += 1;
    teacher;
  };

  public shared ({ caller }) func updateTeacher(id : Nat, input : TeacherTypes.TeacherInput) : async ?TeacherTypes.Teacher {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    TeachersLib.updateTeacher(teachers, id, input);
  };

  public shared ({ caller }) func deleteTeacher(id : Nat) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    TeachersLib.deleteTeacher(teachers, id);
  };

  public query func getTeachers() : async [TeacherTypes.Teacher] {
    TeachersLib.listTeachers(teachers);
  };

  public query func getTeacher(id : Nat) : async ?TeacherTypes.Teacher {
    TeachersLib.getTeacher(teachers, id);
  };
};
