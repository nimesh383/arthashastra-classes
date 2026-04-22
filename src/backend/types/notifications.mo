import CommonTypes "common";

module {
  public type NotificationType = {
    #enrollment;
    #payment;
    #announcement;
    #general;
  };

  public type Notification = {
    id : Text;
    userId : Principal;
    title : Text;
    message : Text;
    notificationType : NotificationType;
    isRead : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type NotificationInput = {
    title : Text;
    message : Text;
    notificationType : NotificationType;
    targetUserId : ?Principal;
  };
};
