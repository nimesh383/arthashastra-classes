import List "mo:core/List";
import TeacherTypes "../types/teachers";

module {
  public type Teacher = TeacherTypes.Teacher;
  public type TeacherInput = TeacherTypes.TeacherInput;

  public func listTeachers(teachers : List.List<Teacher>) : [Teacher] {
    teachers.filter(func(t) { not t.isDeleted }).toArray();
  };

  public func getTeacher(teachers : List.List<Teacher>, id : Nat) : ?Teacher {
    teachers.find(func(t) { t.id == id and not t.isDeleted });
  };

  public func createTeacher(
    teachers : List.List<Teacher>,
    nextId : Nat,
    input : TeacherInput,
  ) : Teacher {
    let teacher : Teacher = {
      id = nextId;
      name = input.name;
      email = input.email;
      specialization = input.specialization;
      profilePhotoUrl = input.profilePhotoUrl;
      isDeleted = false;
    };
    teachers.add(teacher);
    teacher;
  };

  public func updateTeacher(
    teachers : List.List<Teacher>,
    id : Nat,
    input : TeacherInput,
  ) : ?Teacher {
    var updated : ?Teacher = null;
    teachers.mapInPlace(
      func(t) {
        if (t.id == id and not t.isDeleted) {
          let u : Teacher = {
            t with
            name = input.name;
            email = input.email;
            specialization = input.specialization;
            profilePhotoUrl = input.profilePhotoUrl;
          };
          updated := ?u;
          u;
        } else t;
      }
    );
    updated;
  };

  public func deleteTeacher(teachers : List.List<Teacher>, id : Nat) : Bool {
    var found = false;
    teachers.mapInPlace(
      func(t) {
        if (t.id == id and not t.isDeleted) {
          found := true;
          { t with isDeleted = true };
        } else t;
      }
    );
    found;
  };
};
