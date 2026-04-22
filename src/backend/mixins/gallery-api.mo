import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import GalleryTypes "../types/gallery";
import GalleryLib "../lib/gallery";

mixin (galleryImages : List.List<GalleryLib.GalleryImage>) {
  var nextGalleryImageId : Nat = 1;

  public query func getGalleryImages(category : ?GalleryTypes.GalleryCategory) : async [GalleryTypes.GalleryImage] {
    GalleryLib.getGalleryImages(galleryImages, category);
  };

  public shared ({ caller }) func createGalleryImage(input : GalleryTypes.GalleryImageInput) : async GalleryTypes.GalleryImage {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    let id = "gal" # nextGalleryImageId.toText();
    nextGalleryImageId += 1;
    GalleryLib.createGalleryImage(galleryImages, id, input, Time.now());
  };

  public shared ({ caller }) func deleteGalleryImage(id : Text) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    GalleryLib.deleteGalleryImage(galleryImages, id);
  };

  public shared ({ caller }) func toggleGalleryImageVisibility(id : Text) : async ?GalleryTypes.GalleryImage {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    GalleryLib.toggleGalleryImageVisibility(galleryImages, id);
  };
};
