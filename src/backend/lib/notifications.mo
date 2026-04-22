import List "mo:core/List";
import Principal "mo:core/Principal";
import NotificationTypes "../types/notifications";
import CommonTypes "../types/common";

module {
  public type Notification = NotificationTypes.Notification;
  public type NotificationInput = NotificationTypes.NotificationInput;

  public func getMyNotifications(
    notifications : List.List<Notification>,
    userId : Principal,
  ) : [Notification] {
    notifications.filter(func(n) { Principal.equal(n.userId, userId) }).toArray();
  };

  public func markNotificationRead(
    notifications : List.List<Notification>,
    userId : Principal,
    id : Text,
  ) : Bool {
    var found = false;
    notifications.mapInPlace(
      func(n) {
        if (n.id == id and Principal.equal(n.userId, userId)) {
          found := true;
          { n with isRead = true };
        } else n;
      }
    );
    found;
  };

  public func markAllNotificationsRead(
    notifications : List.List<Notification>,
    userId : Principal,
  ) : Nat {
    var count = 0;
    notifications.mapInPlace(
      func(n) {
        if (Principal.equal(n.userId, userId) and not n.isRead) {
          count += 1;
          { n with isRead = true };
        } else n;
      }
    );
    count;
  };

  public func createNotification(
    notifications : List.List<Notification>,
    allStudents : [Principal],
    id : Text,
    input : NotificationInput,
    now : CommonTypes.Timestamp,
  ) : [Notification] {
    let targets : [Principal] = switch (input.targetUserId) {
      case (?uid) [uid];
      case null allStudents;
    };
    var created : [Notification] = [];
    var idx = 0;
    for (uid in targets.values()) {
      let n : Notification = {
        id = id # "-" # idx.toText();
        userId = uid;
        title = input.title;
        message = input.message;
        notificationType = input.notificationType;
        isRead = false;
        createdAt = now;
      };
      notifications.add(n);
      created := created.concat([n]);
      idx += 1;
    };
    created;
  };
};
