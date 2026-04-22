import CommonTypes "common";

module {
  public type ItemType = {
    #material;
    #video;
    #course;
  };

  public type Bookmark = {
    id : Text;
    userId : Principal;
    itemId : Text;
    itemType : ItemType;
    createdAt : CommonTypes.Timestamp;
  };

  public type BookmarkInput = {
    itemId : Text;
    itemType : ItemType;
  };
};
