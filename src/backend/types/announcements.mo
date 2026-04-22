import CommonTypes "common";

module {
  public type AnnouncementType = {
    #info;
    #warning;
    #urgent;
  };

  public type Announcement = {
    id : Text;
    title : Text;
    message : Text;
    announcementType : AnnouncementType;
    isPinned : Bool;
    isActive : Bool;
    expiresAt : ?CommonTypes.Timestamp;
    createdAt : CommonTypes.Timestamp;
  };

  public type AnnouncementInput = {
    title : Text;
    message : Text;
    announcementType : AnnouncementType;
    isPinned : Bool;
    isActive : Bool;
    expiresAt : ?CommonTypes.Timestamp;
  };
};
