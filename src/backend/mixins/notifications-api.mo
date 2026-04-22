import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import NotificationTypes "../types/notifications";
import NotificationsLib "../lib/notifications";
import StudentTypes "../types/students";

mixin (
  notifications : List.List<NotificationsLib.Notification>,
  studentProfiles : Map.Map<Principal, StudentTypes.StudentProfile>,
) {
  var nextNotificationId : Nat = 1;

  public shared query ({ caller }) func getMyNotifications() : async [NotificationTypes.Notification] {
    if (caller.isAnonymous()) Runtime.trap("Must be logged in");
    NotificationsLib.getMyNotifications(notifications, caller);
  };

  public shared ({ caller }) func markNotificationRead(id : Text) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Must be logged in");
    NotificationsLib.markNotificationRead(notifications, caller, id);
  };

  public shared ({ caller }) func markAllNotificationsRead() : async Nat {
    if (caller.isAnonymous()) Runtime.trap("Must be logged in");
    NotificationsLib.markAllNotificationsRead(notifications, caller);
  };

  public shared ({ caller }) func createNotification(input : NotificationTypes.NotificationInput) : async [NotificationTypes.Notification] {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    let allStudents : [Principal] = studentProfiles.keys().toArray();
    let id = "notif" # nextNotificationId.toText();
    nextNotificationId += 1;
    NotificationsLib.createNotification(notifications, allStudents, id, input, Time.now());
  };
};
