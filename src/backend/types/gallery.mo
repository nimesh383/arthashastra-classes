import CommonTypes "common";

module {
  public type GalleryCategory = {
    #classroom;
    #events;
    #results;
    #team;
  };

  public type GalleryImage = {
    id : Text;
    title : Text;
    imageUrl : Text;
    category : GalleryCategory;
    description : ?Text;
    isVisible : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type GalleryImageInput = {
    title : Text;
    imageUrl : Text;
    category : GalleryCategory;
    description : ?Text;
    isVisible : Bool;
  };
};
