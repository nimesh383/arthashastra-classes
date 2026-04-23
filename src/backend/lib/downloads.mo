import List "mo:core/List";
import Time "mo:core/Time";
import DownloadTypes "../types/downloads";
import CommonTypes "../types/common";

module {
  public type DownloadItem = DownloadTypes.DownloadItem;
  public type DownloadItemInput = DownloadTypes.DownloadItemInput;
  public type DownloadCategory = DownloadTypes.DownloadCategory;

  public func getDownloadItems(
    items : List.List<DownloadItem>,
    category : ?DownloadCategory,
  ) : [DownloadItem] {
    items.filter(func(d) {
      d.isPublic and (
        switch (category) {
          case null true;
          case (?cat) d.category == cat;
        }
      )
    }).toArray();
  };

  public func getMyDownloads(
    items : List.List<DownloadItem>,
    category : ?DownloadCategory,
  ) : [DownloadItem] {
    items.filter(func(d) {
      switch (category) {
        case null true;
        case (?cat) d.category == cat;
      }
    }).toArray();
  };

  public func incrementDownloadCount(items : List.List<DownloadItem>, id : Nat) : Bool {
    var found = false;
    items.mapInPlace(func(d) {
      if (d.id == id) {
        found := true;
        { d with downloadCount = d.downloadCount + 1 }
      } else d
    });
    found;
  };

  public func createDownloadItem(
    items : List.List<DownloadItem>,
    nextId : Nat,
    input : DownloadItemInput,
    now : CommonTypes.Timestamp,
  ) : DownloadItem {
    let item : DownloadItem = {
      id = nextId;
      title = input.title;
      description = input.description;
      fileUrl = input.fileUrl;
      fileSize = input.fileSize;
      category = input.category;
      subject = input.subject;
      batchYear = input.batchYear;
      isPublic = input.isPublic;
      downloadCount = 0;
      createdAt = now;
    };
    items.add(item);
    item;
  };

  public func updateDownloadItem(
    items : List.List<DownloadItem>,
    id : Nat,
    input : DownloadItemInput,
  ) : ?DownloadItem {
    var updated : ?DownloadItem = null;
    items.mapInPlace(func(d) {
      if (d.id == id) {
        let u : DownloadItem = {
          d with
          title = input.title;
          description = input.description;
          fileUrl = input.fileUrl;
          fileSize = input.fileSize;
          category = input.category;
          subject = input.subject;
          batchYear = input.batchYear;
          isPublic = input.isPublic;
        };
        updated := ?u;
        u;
      } else d
    });
    updated;
  };

  public func deleteDownloadItem(items : List.List<DownloadItem>, id : Nat) : Bool {
    let sizeBefore = items.size();
    let kept = items.filter(func(d) { d.id != id });
    items.clear();
    items.append(kept);
    items.size() < sizeBefore;
  };

  public func seedDownloadItems(items : List.List<DownloadItem>) {
    if (not items.isEmpty()) return;
    let now = Time.now();
    let seed : [DownloadItem] = [
      // study_notes
      {
        id = 1; title = "Accountancy Class 12 — Complete Notes";
        description = "Chapter-wise notes covering all units of Accountancy for Class 12.";
        fileUrl = "#"; fileSize = "2.4 MB"; category = #study_notes;
        subject = "Accountancy"; batchYear = "2024-25"; isPublic = true;
        downloadCount = 0; createdAt = now;
      },
      {
        id = 2; title = "Economics Class 12 — Microeconomics Notes";
        description = "Detailed notes on Microeconomics for Class 12 Board preparation.";
        fileUrl = "#"; fileSize = "1.8 MB"; category = #study_notes;
        subject = "Economics"; batchYear = "2024-25"; isPublic = true;
        downloadCount = 0; createdAt = now;
      },
      // admit_card
      {
        id = 3; title = "Half Yearly Exam Admit Card 2024";
        description = "Admit card for the Half Yearly examination for Class 11 & 12.";
        fileUrl = "#"; fileSize = "200 KB"; category = #admit_card;
        subject = "All Subjects"; batchYear = "2024-25"; isPublic = false;
        downloadCount = 0; createdAt = now;
      },
      {
        id = 4; title = "Annual Exam Admit Card 2025";
        description = "Admit card for the Annual examination for Class 11 & 12.";
        fileUrl = "#"; fileSize = "200 KB"; category = #admit_card;
        subject = "All Subjects"; batchYear = "2024-25"; isPublic = false;
        downloadCount = 0; createdAt = now;
      },
      // hall_ticket
      {
        id = 5; title = "Mock Test 1 Hall Ticket";
        description = "Hall ticket for Mock Test 1 — November 2024.";
        fileUrl = "#"; fileSize = "150 KB"; category = #hall_ticket;
        subject = "All Subjects"; batchYear = "2024-25"; isPublic = false;
        downloadCount = 0; createdAt = now;
      },
      {
        id = 6; title = "Mock Test 2 Hall Ticket";
        description = "Hall ticket for Mock Test 2 — January 2025.";
        fileUrl = "#"; fileSize = "150 KB"; category = #hall_ticket;
        subject = "All Subjects"; batchYear = "2024-25"; isPublic = false;
        downloadCount = 0; createdAt = now;
      },
      // certificate
      {
        id = 7; title = "Course Completion Certificate — Class 11";
        description = "Certificate of completion for Class 11 Commerce batch.";
        fileUrl = "#"; fileSize = "300 KB"; category = #certificate;
        subject = "Commerce"; batchYear = "2023-24"; isPublic = false;
        downloadCount = 0; createdAt = now;
      },
      {
        id = 8; title = "Top Performer Certificate — Annual Exam 2024";
        description = "Certificate for top performers in Annual Exam 2024.";
        fileUrl = "#"; fileSize = "300 KB"; category = #certificate;
        subject = "Commerce"; batchYear = "2023-24"; isPublic = false;
        downloadCount = 0; createdAt = now;
      },
    ];
    for (d in seed.values()) {
      items.add(d);
    };
  };
};
