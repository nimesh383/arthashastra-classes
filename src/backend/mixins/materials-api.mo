import List "mo:core/List";
import Time "mo:core/Time";
import MaterialTypes "../types/materials";
import MaterialsLib "../lib/materials";
import EnrollmentsLib "../lib/enrollments";

mixin (
  materials : List.List<MaterialsLib.StudyMaterial>,
  enrollments : List.List<EnrollmentsLib.Enrollment>,
) {
  var nextMaterialId : Nat = 1;

  // ── Backward-compatible public endpoint ───────────────────────────────────

  public query func getStudyMaterials() : async [MaterialTypes.StudyMaterial] {
    MaterialsLib.getStudyMaterials(materials);
  };

  // ── Admin endpoints ────────────────────────────────────────────────────────

  public shared ({ caller }) func uploadMaterial(input : MaterialTypes.MaterialInput) : async MaterialTypes.StudyMaterial {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    let material = MaterialsLib.uploadMaterial(materials, nextMaterialId, input, Time.now());
    nextMaterialId += 1;
    material;
  };

  public shared ({ caller }) func deleteMaterial(id : Nat) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    MaterialsLib.deleteMaterial(materials, id);
  };

  public query func getMaterialsForCourse(courseId : Nat) : async [MaterialTypes.StudyMaterial] {
    MaterialsLib.getMaterialsForCourse(materials, courseId);
  };

  // ── Student endpoints ──────────────────────────────────────────────────────

  public shared query ({ caller }) func getMyMaterials() : async [MaterialTypes.StudyMaterial] {
    if (caller.isAnonymous()) return [];
    let enrolledCourseIds = EnrollmentsLib.getEnrolledCourseIds(enrollments, caller);
    MaterialsLib.getMaterialsForCourses(materials, enrolledCourseIds);
  };
};
