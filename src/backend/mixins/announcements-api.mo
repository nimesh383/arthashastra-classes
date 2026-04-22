import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AnnouncementTypes "../types/announcements";
import AnnouncementsLib "../lib/announcements";

mixin (announcements : List.List<AnnouncementsLib.Announcement>) {
  var nextAnnouncementId : Nat = 1;

  public query func getActiveAnnouncements() : async [AnnouncementTypes.Announcement] {
    AnnouncementsLib.getActiveAnnouncements(announcements, Time.now());
  };

  public shared ({ caller }) func createAnnouncement(input : AnnouncementTypes.AnnouncementInput) : async AnnouncementTypes.Announcement {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    let id = "ann" # nextAnnouncementId.toText();
    nextAnnouncementId += 1;
    AnnouncementsLib.createAnnouncement(announcements, id, input, Time.now());
  };

  public shared ({ caller }) func updateAnnouncement(id : Text, input : AnnouncementTypes.AnnouncementInput) : async ?AnnouncementTypes.Announcement {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    AnnouncementsLib.updateAnnouncement(announcements, id, input);
  };

  public shared ({ caller }) func deleteAnnouncement(id : Text) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    AnnouncementsLib.deleteAnnouncement(announcements, id);
  };

  public shared ({ caller }) func toggleAnnouncementActive(id : Text) : async ?AnnouncementTypes.Announcement {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    AnnouncementsLib.toggleAnnouncementActive(announcements, id);
  };
};
