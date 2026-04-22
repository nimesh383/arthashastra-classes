import List "mo:core/List";
import GalleryTypes "../types/gallery";
import CommonTypes "../types/common";

module {
  public type GalleryImage = GalleryTypes.GalleryImage;
  public type GalleryImageInput = GalleryTypes.GalleryImageInput;
  public type GalleryCategory = GalleryTypes.GalleryCategory;

  func categoryEqual(a : GalleryCategory, b : GalleryCategory) : Bool {
    switch (a, b) {
      case (#classroom, #classroom) true;
      case (#events, #events) true;
      case (#results, #results) true;
      case (#team, #team) true;
      case _ false;
    };
  };

  public func getGalleryImages(
    images : List.List<GalleryImage>,
    category : ?GalleryCategory,
  ) : [GalleryImage] {
    switch (category) {
      case null {
        images.filter(func(img) { img.isVisible }).toArray();
      };
      case (?cat) {
        images.filter(func(img) {
          img.isVisible and categoryEqual(img.category, cat)
        }).toArray();
      };
    };
  };

  public func createGalleryImage(
    images : List.List<GalleryImage>,
    id : Text,
    input : GalleryImageInput,
    now : CommonTypes.Timestamp,
  ) : GalleryImage {
    let img : GalleryImage = {
      id;
      title = input.title;
      imageUrl = input.imageUrl;
      category = input.category;
      description = input.description;
      isVisible = input.isVisible;
      createdAt = now;
    };
    images.add(img);
    img;
  };

  public func deleteGalleryImage(
    images : List.List<GalleryImage>,
    id : Text,
  ) : Bool {
    let sizeBefore = images.size();
    let filtered = images.filter(func(img) { img.id != id });
    images.clear();
    images.append(filtered);
    images.size() < sizeBefore;
  };

  public func toggleGalleryImageVisibility(
    images : List.List<GalleryImage>,
    id : Text,
  ) : ?GalleryImage {
    var updated : ?GalleryImage = null;
    images.mapInPlace(
      func(img) {
        if (img.id == id) {
          let u : GalleryImage = { img with isVisible = not img.isVisible };
          updated := ?u;
          u;
        } else img;
      }
    );
    updated;
  };
};
