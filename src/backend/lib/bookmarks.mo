import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import BookmarkTypes "../types/bookmarks";
import CommonTypes "../types/common";

module {
  public type Bookmark = BookmarkTypes.Bookmark;
  public type BookmarkInput = BookmarkTypes.BookmarkInput;
  public type ItemType = BookmarkTypes.ItemType;

  func itemTypeEqual(a : ItemType, b : ItemType) : Bool {
    switch (a, b) {
      case (#material, #material) true;
      case (#video, #video) true;
      case (#course, #course) true;
      case _ false;
    };
  };

  public func addBookmark(
    bookmarks : List.List<Bookmark>,
    id : Text,
    userId : Principal,
    input : BookmarkInput,
    now : CommonTypes.Timestamp,
  ) : Bookmark {
    // Prevent duplicates: same userId + itemId + itemType
    let isDuplicate = bookmarks.any(func(b) {
      Principal.equal(b.userId, userId) and
      b.itemId == input.itemId and
      itemTypeEqual(b.itemType, input.itemType)
    });
    if (isDuplicate) Runtime.trap("Bookmark already exists");
    let bm : Bookmark = {
      id;
      userId;
      itemId = input.itemId;
      itemType = input.itemType;
      createdAt = now;
    };
    bookmarks.add(bm);
    bm;
  };

  public func removeBookmark(
    bookmarks : List.List<Bookmark>,
    userId : Principal,
    itemId : Text,
  ) : Bool {
    let sizeBefore = bookmarks.size();
    let filtered = bookmarks.filter(func(b) {
      not (Principal.equal(b.userId, userId) and b.itemId == itemId)
    });
    bookmarks.clear();
    bookmarks.append(filtered);
    bookmarks.size() < sizeBefore;
  };

  public func getMyBookmarks(
    bookmarks : List.List<Bookmark>,
    userId : Principal,
  ) : [Bookmark] {
    bookmarks.filter(func(b) { Principal.equal(b.userId, userId) }).toArray();
  };
};
