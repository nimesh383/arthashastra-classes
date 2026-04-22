import List "mo:core/List";
import Time "mo:core/Time";
import MaterialTypes "../types/materials";
import CommonTypes "../types/common";

module {
  public type StudyMaterial = MaterialTypes.StudyMaterial;
  public type MaterialInput = MaterialTypes.MaterialInput;

  // ── Existing public API ────────────────────────────────────────────────────

  public func getStudyMaterials(materials : List.List<StudyMaterial>) : [StudyMaterial] {
    materials.filter(func(m) { not m.isDeleted }).toArray();
  };

  // ── Admin API ──────────────────────────────────────────────────────────────

  public func uploadMaterial(
    materials : List.List<StudyMaterial>,
    nextId : Nat,
    input : MaterialInput,
    now : CommonTypes.Timestamp,
  ) : StudyMaterial {
    let material : StudyMaterial = {
      id = nextId;
      courseId = input.courseId;
      title = input.title;
      description = input.description;
      fileUrl = input.fileUrl;
      fileType = input.fileType;
      fileSize = input.fileSize;
      uploadedAt = now;
      isDeleted = false;
      subject = #Commerce;
      materialType = #PDF;
      uploadDate = now;
      fileKey = input.fileUrl;
    };
    materials.add(material);
    material;
  };

  public func deleteMaterial(materials : List.List<StudyMaterial>, id : Nat) : Bool {
    var found = false;
    materials.mapInPlace(
      func(m) {
        if (m.id == id and not m.isDeleted) {
          found := true;
          { m with isDeleted = true };
        } else m;
      }
    );
    found;
  };

  // ── Student API ────────────────────────────────────────────────────────────

  public func getMaterialsForCourse(
    materials : List.List<StudyMaterial>,
    courseId : Nat,
  ) : [StudyMaterial] {
    materials.filter(func(m) { m.courseId == courseId and not m.isDeleted }).toArray();
  };

  public func getMaterialsForCourses(
    materials : List.List<StudyMaterial>,
    courseIds : [Nat],
  ) : [StudyMaterial] {
    materials.filter(func(m) {
      if (m.isDeleted) return false;
      courseIds.find(func(id : Nat) : Bool { id == m.courseId }) != null;
    }).toArray();
  };

  // ── Legacy seed ────────────────────────────────────────────────────────────

  public func seedMaterials(materials : List.List<StudyMaterial>, now : Int) {
    if (not materials.isEmpty()) return;
    let seed : [StudyMaterial] = [
      {
        id = 1;
        courseId = 1;
        title = "Class 11 Accountancy Notes";
        description = "Comprehensive notes for Class 11 Accountancy covering all chapters.";
        fileUrl = "";
        fileType = #PDF;
        fileSize = null;
        uploadedAt = now;
        isDeleted = false;
        subject = #Accountancy;
        materialType = #Notes;
        uploadDate = now;
        fileKey = "";
      },
      {
        id = 2;
        courseId = 2;
        title = "Class 12 Economics PYQs";
        description = "Previous year question papers for Class 12 Economics.";
        fileUrl = "";
        fileType = #PDF;
        fileSize = null;
        uploadedAt = now;
        isDeleted = false;
        subject = #Economics;
        materialType = #PYQ;
        uploadDate = now;
        fileKey = "";
      },
    ];
    for (m in seed.values()) {
      materials.add(m);
    };
  };
};
