import CommonTypes "common";

module {
  public type Video = {
    id : Text;
    title : Text;
    description : Text;
    courseId : Text;
    thumbnailUrl : Text;
    videoUrl : Text;
    isPreview : Bool;
    order : Nat;
    createdBy : Principal;
    createdAt : CommonTypes.Timestamp;
  };

  public type VideoInput = {
    title : Text;
    description : Text;
    courseId : Text;
    thumbnailUrl : Text;
    videoUrl : Text;
    isPreview : Bool;
    order : Nat;
  };
};
