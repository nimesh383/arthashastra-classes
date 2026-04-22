import List "mo:core/List";
import AnnouncementTypes "../types/announcements";
import CommonTypes "../types/common";

module {
  public type Announcement = AnnouncementTypes.Announcement;
  public type AnnouncementInput = AnnouncementTypes.AnnouncementInput;

  public func getActiveAnnouncements(
    announcements : List.List<Announcement>,
    now : CommonTypes.Timestamp,
  ) : [Announcement] {
    announcements.filter(func(a) {
      if (not a.isActive) return false;
      switch (a.expiresAt) {
        case (?exp) exp > now;
        case null true;
      };
    }).toArray();
  };

  public func createAnnouncement(
    announcements : List.List<Announcement>,
    id : Text,
    input : AnnouncementInput,
    now : CommonTypes.Timestamp,
  ) : Announcement {
    let a : Announcement = {
      id;
      title = input.title;
      message = input.message;
      announcementType = input.announcementType;
      isPinned = input.isPinned;
      isActive = input.isActive;
      expiresAt = input.expiresAt;
      createdAt = now;
    };
    announcements.add(a);
    a;
  };

  public func updateAnnouncement(
    announcements : List.List<Announcement>,
    id : Text,
    input : AnnouncementInput,
  ) : ?Announcement {
    var updated : ?Announcement = null;
    announcements.mapInPlace(
      func(a) {
        if (a.id == id) {
          let u : Announcement = {
            a with
            title = input.title;
            message = input.message;
            announcementType = input.announcementType;
            isPinned = input.isPinned;
            isActive = input.isActive;
            expiresAt = input.expiresAt;
          };
          updated := ?u;
          u;
        } else a;
      }
    );
    updated;
  };

  public func deleteAnnouncement(
    announcements : List.List<Announcement>,
    id : Text,
  ) : Bool {
    let sizeBefore = announcements.size();
    let filtered = announcements.filter(func(a) { a.id != id });
    announcements.clear();
    announcements.append(filtered);
    announcements.size() < sizeBefore;
  };

  public func toggleAnnouncementActive(
    announcements : List.List<Announcement>,
    id : Text,
  ) : ?Announcement {
    var updated : ?Announcement = null;
    announcements.mapInPlace(
      func(a) {
        if (a.id == id) {
          let u : Announcement = { a with isActive = not a.isActive };
          updated := ?u;
          u;
        } else a;
      }
    );
    updated;
  };

  public func seedAnnouncements(
    announcements : List.List<Announcement>,
    now : CommonTypes.Timestamp,
  ) {
    if (not announcements.isEmpty()) return;
    let a : Announcement = {
      id = "ann1";
      title = "Welcome to Arthashastra Classes!";
      message = "We are excited to welcome you to our digital platform. Explore courses, study materials, and test series to accelerate your commerce journey. Enroll today and start your path to success!";
      announcementType = #info;
      isPinned = true;
      isActive = true;
      expiresAt = null;
      createdAt = now;
    };
    announcements.add(a);
  };
};
